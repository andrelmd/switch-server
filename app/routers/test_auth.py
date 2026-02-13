from datetime import datetime, timedelta, timezone
from typing import Dict
from urllib import response

import jwt
import pytest
from fastapi.testclient import TestClient

from app.config import settings
from app.constants import ERRORS
from app.main import app

client = TestClient(app)


def test_login_bad_credentials():
    response = client.post(
        "/api/auth/v1/login",
        data={"username": "wrong user", "password": "wrong password"},
    )
    assert response.status_code == 401
    assert response.json() == {"detail": ERRORS["INCORRECT_USERNAME_OR_PASSWORD"]}


def test_login_good_credentials():
    response = client.post(
        "/api/auth/v1/login",
        data={
            "username": settings.api_admin_user,
            "password": settings.api_admin_password,
        },
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"


@pytest.fixture
def admin_token() -> Dict[str, str]:
    response = client.post(
        "/api/auth/v1/login",
        data={
            "username": settings.api_admin_user,
            "password": settings.api_admin_password,
        },
    )
    assert response.status_code == 200
    return {
        "access_token": response.json()["access_token"],
        "token_type": response.json()["token_type"],
        "refresh_token": response.cookies["refresh_token"],
    }


def test_read_me(admin_token):
    response = client.get(
        "/api/auth/v1/me",
        headers={
            "Authorization": f"{admin_token['token_type']} {admin_token['access_token']}"
        },
    )
    assert response.status_code == 200
    assert response.json() == {"username": settings.api_admin_user}


def test_read_me_bad_token():
    response = client.get(
        "/api/auth/v1/me",
        headers={"Authorization": "Bearer bad_token"},
    )
    assert response.status_code == 401
    assert response.json() == {"detail": ERRORS["COULD_NOT_VALIDATE_CREDENTIALS"]}


def test_read_me_expired_token():
    payload = {
        "sub": settings.api_admin_user,
        "exp": datetime.now(timezone.utc) - timedelta(minutes=1),
    }
    token = jwt.encode(payload, settings.secret_key, algorithm=settings.algorithm)

    response = client.get(
        "/api/auth/v1/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 401
    assert response.json() == {"detail": ERRORS["COULD_NOT_VALIDATE_CREDENTIALS"]}


def test_refresh_token(admin_token):
    client.cookies = {
        "refresh_token": admin_token["refresh_token"],
    }
    response = client.post(
        "/api/auth/v1/refresh",
    )
    assert response.status_code == 200

    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"
    assert "refresh_token" in response.cookies


def test_refresh_token_bad_token():
    client.cookies = {
        "refresh_token": "bad_token",
    }
    response = client.post(
        "/api/auth/v1/refresh",
    )
    assert response.status_code == 401
