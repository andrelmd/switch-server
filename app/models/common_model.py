from pydantic import BaseModel


class User(BaseModel):
    username: str


class LoginRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    user: User


class Cookies(BaseModel):
    refresh_token: str | None = None
