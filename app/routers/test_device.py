from typing import Dict
from unittest.mock import AsyncMock, patch

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, StaticPool, create_engine

from app.config import settings
from app.main import app
from app.models.device_model import DevicePort
from app.utils import get_session, is_device_reachable

client = TestClient(app)


@pytest.fixture
def admin_token() -> Dict[str, str]:
    """Fixture to obtain a valid admin token for requests."""
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
    }


@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override

    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


@patch("app.routers.device.retrieve_device_configs", new_callable=AsyncMock)
@patch("app.routers.device.is_device_reachable", new_callable=AsyncMock)
def test_create_device(mock_reachable, mock_retrieve, admin_token, client: TestClient):
    """Test creating a device with mocked reachability and config retrieval."""

    mock_reachable.return_value = True
    mock_retrieve.return_value = [
        DevicePort(port_number=1, enabled=True, speed="auto", flow_control="off")
    ]

    payload = {
        "id": 1,
        "ip_address": "192.168.0.100",
        "name": "Office Switch",
        "username": "admin",
        "password": "admin",
    }

    headers = {
        "Authorization": f"{admin_token['token_type']} {admin_token['access_token']}"
    }
    response = client.post("/api/devices/v1", json=payload, headers=headers)

    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Office Switch"
    assert len(data["ports"]) == 1
    assert data["ports"][0]["port_number"] == 1


@patch("app.routers.device.is_device_reachable", new_callable=AsyncMock)
def test_create_device_unreachable(
    mock_reachable: AsyncMock, admin_token, client: TestClient
):
    """Test that creating an unreachable device returns 400."""
    mock_reachable.return_value = False

    payload = {
        "ip_address": "192.168.0.101",
        "name": "Unreachable Switch",
        "username": "admin",
        "password": "admin",
    }

    headers = {
        "Authorization": f"{admin_token['token_type']} {admin_token['access_token']}"
    }

    response = client.post("/api/devices/v1", json=payload, headers=headers)
    assert response.status_code == 400
    assert response.json() == {"detail": "Device is not reachable"}


def test_create_device_unauthorized():
    """Test that creating a device without token returns 401."""
    payload = {
        "id": 1,
        "ip_address": "192.168.0.100",
        "name": "Office Switch",
        "created_at": "2024-01-01T12:00:00",
        "updated_at": "2024-01-01T12:00:00",
        "ports": [],
    }
    response = client.post("/api/devices/v1", json=payload)
    assert response.status_code == 401


def test_get_devices(admin_token, client: TestClient):
    """Test retrieving the list of devices."""
    headers = {
        "Authorization": f"{admin_token['token_type']} {admin_token['access_token']}"
    }

    response = client.get("/api/devices/v1", headers=headers)

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_device_not_found(admin_token, client: TestClient):
    """Test retrieving a non-existent device returns 404."""
    headers = {
        "Authorization": f"{admin_token['token_type']} {admin_token['access_token']}"
    }

    response = client.get("/api/devices/v1/99999", headers=headers)

    assert response.status_code == 404
    assert response.json() == {"detail": "Device not found"}
