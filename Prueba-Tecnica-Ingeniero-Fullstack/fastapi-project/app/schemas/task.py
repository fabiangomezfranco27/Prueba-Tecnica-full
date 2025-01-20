from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False

class TaskCreate(TaskBase):
    owner_id: int

class TaskUpdate(TaskBase):
    title: Optional[str] = None
    description: Optional[str] = None
    owner_id: Optional[int] = None
    completed: Optional[bool] = None

class TaskResponse(TaskBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class Task(TaskResponse):
    pass