import logging
from passlib.context import CryptContext
from app.database import Base, engine, SessionLocal, init_db
from app.models.user import User
from app.models.task import Task

# Configurar hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_initial_user():
    db = SessionLocal()
    try:
        
        # Hashear contraseña con passlib
        password = "test123"
        hashed_password = pwd_context.hash(password)
        
        # Crear nuevo usuario
        user = User(
            email="test@example.com",
            username="TestUser",
            hashed_password=hashed_password
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        logger.info(f"✅ Usuario creado: {user.email}")
        
    except Exception as e:
        logger.error(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
    logger.info("✅ Tablas creadas")
    create_initial_user()