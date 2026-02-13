from sqlmodel import Field, Relationship, SQLModel


class DevicePortBase(SQLModel):
    enabled: bool = True
    speed: int = 1
    flow_control: bool = False


class DevicePort(DevicePortBase, table=True):
    device_id: int | None = Field(
        default=None, foreign_key="device.id", primary_key=True
    )
    port_number: int | None = Field(default=None, primary_key=True)
    device: Device = Relationship(back_populates="ports")


class DeviceBase(SQLModel):
    ip_address: str
    name: str


class Device(DeviceBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str
    password: str
    ports: list[DevicePort] = Relationship(back_populates="device")


class DevicePortDto(DevicePortBase):
    port_number: int


class DeviceDto(DeviceBase):
    id: int
    ports: list[DevicePortDto]


class DeviceCreate(DeviceBase):
    username: str
    password: str
