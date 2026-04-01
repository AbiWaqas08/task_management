from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.init_db import get_db
from app.models.task import Task, TaskStatus
from app.schemas.task import TaskCreate, TaskOut, TaskUpdate
from app.routes.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/tasks", tags=["tasks"])

# -----------------------------
# Create Task
# -----------------------------
@router.post("/", response_model=TaskOut)
def create_task(task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_task = Task(
        title=task.title,
        description=task.description,
        status=task.status,
        assigned_to=task.assigned_to,
        created_by=current_user.id
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

# -----------------------------
# Get All Tasks
# -----------------------------
@router.get("/", response_model=List[TaskOut])
def get_tasks(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role == "admin":
        return db.query(Task).all()
    else:
        return db.query(Task).filter(
            (Task.created_by == current_user.id) |
            (Task.assigned_to == current_user.id)
        ).all()
# -----------------------------
# Get Single Task by ID
# -----------------------------
@router.get("/{task_id}", response_model=TaskOut)
def get_task(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if current_user.role != "admin":
        if task.created_by != current_user.id and task.assigned_to != current_user.id:
            raise HTTPException(status_code=403, detail="Not authorized")

    return task
# -----------------------------
# Update Task
# -----------------------------
@router.put("/{task_id}", response_model=TaskOut)
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if current_user.role != "admin" and task.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    for key, value in task_update.dict(exclude_unset=True).items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)

    return task

# -----------------------------
# Delete Task
# -----------------------------
@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if current_user.role != "admin" and task.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    db.delete(task)
    db.commit()

    return {"detail": "Task deleted successfully"}