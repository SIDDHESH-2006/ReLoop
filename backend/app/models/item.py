from sqlalchemy import Column, Float, Integer, String, Text
from app.db.base import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=False)
    condition = Column(String(50), nullable=False)
    value = Column(Float, default=0.0)
    location = Column(String(200), nullable=False)
    route = Column(String(50), nullable=False, default="sell")
    status = Column(String(50), nullable=False, default="available")
