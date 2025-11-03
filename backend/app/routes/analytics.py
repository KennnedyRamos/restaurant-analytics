from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import get_db
from .. import crud
from typing import Optional
from datetime import date

router = APIRouter() 

@router.get("/overview")
def overview(
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    db: Session = Depends(get_db)
):
    filters = {"start_date": start_date, "end_date": end_date}
    return crud.get_overview(db, filters)

@router.get("/top-products")
def top_products(
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    limit: int = 10,
    db: Session = Depends(get_db)
):
    filters = {"start_date": start_date, "end_date": end_date}
    return crud.get_top_products(db, limit=limit, filters=filters)

@router.get("/trends")
def get_trends(
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    db: Session = Depends(get_db)
):
    filters = {"start_date": start_date, "end_date": end_date}
    return crud.get_trends(db, filters)
