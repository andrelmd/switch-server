"""
Application configuration using Pydantic Settings.
Loads and validates environment variables.
"""

from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Admin Credentials
    api_admin_user: str = "admin"
    api_admin_password: str = "admin"

    # JWT Settings
    secret_key: str = "secret_key"
    access_token_expire_minutes: int = 15
    refresh_token_expire_days: int = 7
    algorithm: str = "HS256"

    # Application Settings
    app_name: str = "Switch Server API"
    debug: bool = False
    sqlite_file_name: str = "database.db"
    sqlite_file_path: str = "./"
    allowed_hosts: List[str] = ["*"]

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
