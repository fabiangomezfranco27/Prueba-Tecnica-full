import warnings
warnings.filterwarnings("ignore", ".*bcrypt version.*")

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models import user, task
from app.routers import user as user_router, task as task_router
from .routers import auth
from .routers.auth import oauth2_scheme

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ruta raíz
@app.get("/")
async def root():
    return {"message": "API funcionando"}

# Incluir routers con prefijo api
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(user_router.router, prefix="/api/users", tags=["users"])
app.include_router(task_router.router, prefix="/api/tasks", tags=["tasks"])

@app.get("/test-token")
async def test_token(token: str = Depends(oauth2_scheme)):
    return {
        "message": "Token válido",
        "token": token
    }

@app.on_event("startup")
def startup():
    with engine.begin() as conn:
        user.Base.metadata.create_all(bind=conn)
        task.Base.metadata.create_all(bind=conn)
