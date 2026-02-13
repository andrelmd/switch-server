import traceback
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Annotated

import jwt
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import ValidationError
from sqlmodel import Session, SQLModel, create_engine

from app.config import settings
from app.models.common_model import User
from app.models.device_model import Device, DevicePort
from app.services.switch_service import SwitchService

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/v1/login")


def is_valid_login(username: str, password: str) -> bool:
    return (
        username == settings.api_admin_user and password == settings.api_admin_password
    )


def _create_token(subject: str, expires_delta: timedelta) -> str:
    return jwt.encode(
        {
            "sub": subject,
            "exp": datetime.now(timezone.utc) + expires_delta,
        },
        settings.secret_key,
        algorithm=settings.algorithm,
    )


def create_access_token(username: str) -> str:
    return _create_token(
        username, timedelta(minutes=settings.access_token_expire_minutes)
    )


def create_refresh_token(username: str) -> str:
    return _create_token(username, timedelta(days=settings.refresh_token_expire_days))


def verify_access_token(token: str) -> User | None:
    try:
        payload = jwt.decode(
            token, settings.secret_key, algorithms=[settings.algorithm]
        )
        return User(username=payload["sub"])
    except (ValidationError, jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> User | None:
    user = verify_access_token(token)
    return user


sqlite_file_complete_path = Path(
    f"{settings.sqlite_file_path}{settings.sqlite_file_name}"
)
sqlite_file_complete_path.parent.mkdir(parents=True, exist_ok=True)

sqlite_url = f"sqlite:///{sqlite_file_complete_path}"
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


async def is_device_reachable(device: Device) -> bool:
    # for now just return as I have no way to check in production
    print("i was not mocked")
    return True
    try:
        with SwitchService(device) as switch:
            switch.set_device_name("New-Switch-Name")
            switch.set_port_state(port_id=1, enabled=False)
            switch.save_config()
    except:
        return False

    return True


async def retrieve_device_configs(device: Device) -> list[DevicePort] | None:
    try:
        # for now just create a default port value
        ports = []
        for port_number in range(7):
            port = DevicePort(port_number=port_number + 1)
            ports.append(port)
        return ports
        with SwitchService(device) as switch:
            pass
    except:
        return None
