from sqlalchemy import Column, Integer, String, Float, Date
from .database import Base

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    product = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    channel = Column(String, nullable=False)
    store = Column(String, nullable=True)
    date = Column(Date, nullable=False)
