from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from app.models.task import TaskStatus

# task schema 
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[TaskStatus] = TaskStatus.pending
    assigned_to: Optional[int] = None


# create task 
class TaskCreate(TaskBase):
    pass


# update task 
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    assigned_to: Optional[int] = None

class TaskOut(TaskBase):
    id: int
    created_by: int
    created_at: datetime

    class Config:
        from_attributes = True