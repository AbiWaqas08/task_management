from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.task import Task, TaskStatus
from app.schemas.task import TaskCreate, TaskUpdate, TaskOut
from app.routes.auth import get_current_user

router = APIRouter(prefix="/tasks", tags=["tasks"])

# GET all tasks (admin can see all)
@router.get("/", response_model=list[TaskOut])
def get_tasks(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(Task).all()

# GET single task by id
@router.get("/{task_id}", response_model=TaskOut)
def get_task(task_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

# CREATE a task
@router.post("/", response_model=TaskOut)
def create_task(task: TaskCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    db_task = Task(
        title=task.title,
        description=task.description,
        status=task.status or TaskStatus.pending,
        created_by=current_user.id,
        assigned_to=task.assigned_to
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

# UPDATE a task
@router.put("/{task_id}", response_model=TaskOut)
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.title = task.title or db_task.title
    db_task.description = task.description or db_task.description
    db_task.status = task.status or db_task.status
    db_task.assigned_to = task.assigned_to or db_task.assigned_to
    db.commit()
    db.refresh(db_task)
    return db_task

# DELETE a task
@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"detail": "Task deleted"}