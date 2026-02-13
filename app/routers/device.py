from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import select

from app.models.device_model import Device, DeviceCreate, DeviceDto, DevicePort
from app.utils import SessionDep, get_current_user

router = APIRouter(
    prefix="/devices", tags=["devices"], dependencies=[Depends(get_current_user)]
)


@router.post("/v1", response_model=DeviceDto)
async def create_device(device: DeviceCreate, session: SessionDep):
    db_device = Device.model_validate(device)

    ports = []
    for port_number in range(7):
        port = DevicePort(port_number=port_number + 1)
        ports.append(port)

    db_device.ports = ports

    session.add(db_device)
    session.commit()
    session.refresh(db_device)
    return db_device


@router.get("/v1", response_model=list[DeviceDto])
async def get_devices(
    session: SessionDep,
    offset: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    devices = session.exec(select(Device).offset(offset).limit(limit)).all()
    return devices


@router.get("/v1/{device_id}", response_model=DeviceDto)
async def get_device(device_id: int, session: SessionDep):
    device = session.exec(select(Device).where(Device.id == device_id)).first()

    if not device:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Device not found"
        )
    return device
