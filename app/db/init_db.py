from app.db.session import engine, Base
from app.models import user, task, comment
from sqlalchemy.orm import sessionmaker

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db   # ✅ MUST be yield (not return)
    finally:
        db.close()