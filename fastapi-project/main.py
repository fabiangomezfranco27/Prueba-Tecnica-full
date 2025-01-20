from fastapi import FastAPI, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.routers import user, auth_router, task_router
from app.crud import user as crud_user, task as crud_task
from app.database import get_db
from app.schemas.user import UserCreate, User, UserUpdate
from app.schemas.task import TaskCreate, Task
from typing import Optional

app = FastAPI(title="Task Management API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "API is running"
    }

# Actualizar prefijos sin barras finales
app.include_router(
    auth_router, 
    prefix="/api", 
    tags=["auth"]
)
app.include_router(
    user.router, 
    prefix="/api/users",  # Cambiar a singular
    tags=["users"]
)
app.include_router(
    task_router, 
    prefix="/api/tasks",  # Cambiar a singular
    tags=["tasks"]
)