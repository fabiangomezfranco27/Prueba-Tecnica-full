import logging
from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from app.crud import user as crud_user
from app.schemas.user import User, UserCreate, UserUpdate
from app.database import get_db

logger = logging.getLogger(__name__)

router = APIRouter()

def get_user_by_id(db: Session, user_id: int):
    logger.info(f"Buscando usuario con id: {user_id}")
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        logger.info(f"Usuario encontrado: {user}")
    else:
        logger.warning(f"Usuario con id {user_id} no encontrado")
    return user

@router.post("/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email ya registrado")
    return crud_user.create_user(db=db, user=user)

@router.get("/", response_model=list[User])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = crud_user.get_users(db, skip=skip, limit=limit)
    return users

@router.get("/{user_id}", response_model=User)
async def read_user(
    user_id: int = Path(..., gt=0, description="ID del usuario"),
    db: Session = Depends(get_db)
):
    logger.info(f"Recibida solicitud para obtener usuario con id: {user_id}")
    db_user = crud_user.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        logger.warning(f"Usuario con id {user_id} no encontrado")
        raise HTTPException(
            status_code=404,
            detail=f"Usuario con id {user_id} no encontrado"
        )
    return db_user

@router.put("/{user_id}", response_model=User)
async def update_user(
    user_id: int = Path(..., gt=0),
    user: UserUpdate = None,
    db: Session = Depends(get_db)
):
    db_user = crud_user.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(
            status_code=404,
            detail=f"Usuario con id {user_id} no encontrado"
        )
    return crud_user.update_user(db, user_id=user_id, user=user)

@router.delete("/{user_id}")
async def delete_user(
    user_id: int = Path(..., gt=0),
    db: Session = Depends(get_db)
):
    db_user = crud_user.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(
            status_code=404,
            detail=f"Usuario con id {user_id} no encontrado"
        )
    crud_user.delete_user(db, user_id=user_id)
    return {"message": f"Usuario {user_id} eliminado"}