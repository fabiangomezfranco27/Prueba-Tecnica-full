from app.database import Base, engine, SessionLocal
from app.core import init_models  # Importa los modelos para registrarlos

# Crear todas las tablas en la base de datos
Base.metadata.create_all(bind=engine)