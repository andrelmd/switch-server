from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Cookie, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm

from app.config import settings
from app.constants import ERRORS
from app.models.common_model import Cookies, Token, User
from app.utils import (
    create_access_token,
    create_refresh_token,
    get_current_user,
    is_valid_login,
    verify_access_token,
)

router = APIRouter(prefix="/auth", tags=["authentication"])


def _set_refresh_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        key="refresh_token",
        value=token,
        httponly=True,
        max_age=int(timedelta(days=settings.refresh_token_expire_days).total_seconds()),
        samesite="lax",
    )


@router.post("/v1/login", response_model=Token)
async def login(
    response: Response, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    if not is_valid_login(form_data.username, form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ERRORS["INCORRECT_USERNAME_OR_PASSWORD"],
        )

    username = form_data.username
    access_token = create_access_token(username)
    refresh_token = create_refresh_token(username)

    _set_refresh_cookie(response, refresh_token)

    return Token(
        user=User(username=username),
        access_token=access_token,
        token_type="bearer",
    )


@router.get("/v1/me", response_model=User)
async def read_current_user(current_user: Annotated[User, Depends(get_current_user)]):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ERRORS["COULD_NOT_VALIDATE_CREDENTIALS"],
        )

    return current_user


@router.post("/v1/refresh", response_model=Token)
async def refresh_token(response: Response, cookies: Annotated[Cookies, Cookie()]):
    refresh_token = cookies.refresh_token

    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ERRORS["COULD_NOT_VALIDATE_CREDENTIALS"],
        )

    user = verify_access_token(refresh_token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ERRORS["COULD_NOT_VALIDATE_CREDENTIALS"],
        )

    new_access_token = create_access_token(user.username)
    new_refresh_token = create_refresh_token(user.username)

    _set_refresh_cookie(response, new_refresh_token)

    return Token(
        user=user,
        access_token=new_access_token,
        token_type="bearer",
    )
