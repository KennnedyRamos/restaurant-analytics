from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, crud, schemas
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Sale)
def create_sale(sale: schemas.SaleCreate, db: Session = Depends(get_db)):
    return crud.create_sale(db, sale.dict())

@router.get("/")
def list_sales(db: Session = Depends(get_db)):
    return db.query(models.Sale).limit(100).all()
