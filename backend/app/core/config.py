from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Reloop"
    database_url: str = "postgresql://reloop:reloop123@localhost:5432/reloop"
    secret_key: str = "change-me-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    class Config:
        env_file = ".env"


settings = Settings()
