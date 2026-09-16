from pydantic import BaseModel
from typing import Optional


class ItemCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    condition: str
    value: float = 0.0
    location: str
    route: Optional[str] = "sell"
    status: Optional[str] = "available"


class ItemRead(ItemCreate):
    id: int
