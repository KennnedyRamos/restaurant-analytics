from sqlalchemy import func, desc, and_
from . import models

def apply_filters(query, filters):
    """Aplica filtros dinâmicos às consultas."""
    if not filters:
        return query

    conditions = []
    if filters.get("start_date"):
        conditions.append(models.Sale.date >= filters["start_date"])
    if filters.get("end_date"):
        conditions.append(models.Sale.date <= filters["end_date"])
    if filters.get("store") and filters["store"].lower() != "all":
        conditions.append(models.Sale.store == filters["store"])
    if filters.get("channel"):
        conditions.append(models.Sale.channel == filters["channel"])

    if conditions:
        query = query.filter(and_(*conditions))

    return query


def get_sales_by_channel(db, filters=None):
    """Retorna o total de vendas agrupadas por canal."""
    query = (
        db.query(
            models.Sale.channel,
            func.sum(models.Sale.amount).label("total")
        )
    )
    query = apply_filters(query, filters)
    results = query.group_by(models.Sale.channel).all()
    return {r.channel: float(r.total) for r in results}


def get_top_products(db, limit=10, filters=None):
    """Retorna os produtos mais vendidos."""
    query = (
        db.query(
            models.Sale.product.label("produto"),
            func.sum(models.Sale.amount).label("total_vendido")
        )
    )
    query = apply_filters(query, filters)
    results = (
        query.group_by(models.Sale.product)
        .order_by(desc("total_vendido"))
        .limit(limit)
        .all()
    )
    return [dict(r._mapping) for r in results]


def get_overview(db, filters=None):
    """Gera um resumo geral das vendas."""
    base_query = db.query(
        func.sum(models.Sale.amount).label("total_sales"),
        func.count(models.Sale.id).label("total_orders"),
        func.avg(models.Sale.amount).label("ticket_medio")
    )
    base_query = apply_filters(base_query, filters)
    result = base_query.first()

    top_products = get_top_products(db, limit=10, filters=filters)
    sales_by_channel = get_sales_by_channel(db, filters=filters)

    return {
        "total_sales": float(result.total_sales or 0),
        "total_orders": int(result.total_orders or 0),
        "ticket_medio": round(float(result.ticket_medio or 0), 2),
        "top_products": top_products,
        "sales_by_channel": sales_by_channel,
    }


def get_trends(db, filters=None):
    """Retorna tendências de vendas diárias."""
    query = (
        db.query(
            models.Sale.date.label("period"),
            func.sum(models.Sale.amount).label("sales_total"),
            func.count(models.Sale.id).label("orders_total"),
        )
    )
    query = apply_filters(query, filters)
    results = query.group_by(models.Sale.date).order_by(models.Sale.date).all()

    trends = []
    for i, r in enumerate(results):
        growth = 0
        if i > 0 and results[i - 1].sales_total:
            growth = ((r.sales_total - results[i - 1].sales_total) / results[i - 1].sales_total) * 100

        trends.append({
            "period": str(r.period),
            "sales_total": float(r.sales_total),
            "orders_total": int(r.orders_total),
            "growth_percentage": round(growth, 2)
        })

    return trends


def create_sale(db, sale_data):
    sale = models.Sale(**sale_data)
    db.add(sale)
    db.commit()
    db.refresh(sale)
    return sale
