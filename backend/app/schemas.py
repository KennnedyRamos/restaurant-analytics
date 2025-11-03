from pydantic import BaseModel
from typing import Optional, List, Dict
import datetime

# --- Sale schemas ---
class SaleBase(BaseModel):
    product: str
    amount: float
    channel: str
    store: Optional[str] = None
    date: datetime.date

class SaleCreate(SaleBase):
    pass

class Sale(SaleBase):
    id: int
    class Config:
        from_attributes = True

# --- Overview metrics ---
class OverviewMetrics(BaseModel):
    total_sales: float
    total_orders: int
    ticket_medio: float
    top_products: List[Dict]
    sales_by_channel: Dict[str, float]

# --- Trend metrics ---
class TrendMetrics(BaseModel):
    period: str
    sales_total: float
    orders_total: int
    growth_percentage: float
