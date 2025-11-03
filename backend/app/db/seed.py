import datetime
from sqlalchemy.orm import Session
from ..database import SessionLocal, engine, Base
from .. import models

def seed_data():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    if db.query(models.Sale).first():
        print("⚠️  Dados já existem, ignorando seed.")
        db.close()
        return

    data = [
        {"product": "Pizza Calabresa", "amount": 2532.0, "channel": "ifood", "store": "Loja Central", "date": "2025-11-02"},
        {"product": "Hambúrguer Artesanal", "amount": 1784.0, "channel": "ifood", "store": "Loja Central", "date": "2025-11-02"},
        {"product": "Refrigerante 2L", "amount": 1210.0, "channel": "ifood", "store": "Loja Central", "date": "2025-11-02"},
        {"product": "Pizza Portuguesa", "amount": 1950.0, "channel": "rappi", "store": "Filial Norte", "date": "2025-11-03"},
        {"product": "Coca-Cola Lata", "amount": 980.0, "channel": "whatsapp", "store": "Filial Norte", "date": "2025-11-04"},
    ]

    for d in data:
        d["date"] = datetime.datetime.strptime(d["date"], "%Y-%m-%d").date()
        sale = models.Sale(**d)
        db.add(sale)

    db.commit()
    db.close()
    print("✅ Banco populado com sucesso!")

if __name__ == "__main__":
    seed_data()
