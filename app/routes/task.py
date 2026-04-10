# backend/app/routes/task.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.task import Task, TaskStatus
from app.schemas.task import TaskCreate, TaskUpdate, TaskOut
from app.db.init_db import get_db
from app.auth import get_current_user, require_admin

router = APIRouter(prefix="/tasks", tags=["tasks"])

# Admin: get all tasks
@router.get("/admin", response_model=list[TaskOut])
def get_all_tasks_admin(db: Session = Depends(get_db), current_user=Depends(require_admin)):
    return db.query(Task).all()


@router.get("/my", response_model=list[TaskOut])
def get_my_tasks(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return db.query(Task).filter(Task.assigned_to == current_user.id).all()


@router.get("/{task_id}", response_model=TaskOut)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # ✅ Admin can access all tasks
    if current_user.role == "admin":
        return task

    # ✅ User can only access assigned tasks
    if task.assigned_to != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    return task


# Create task (Admin only)
@router.post("/admin", response_model=TaskOut)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)   # <-- this ensures admin only
):
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

# Update task (Admin only)
@router.put("/{task_id}", response_model=TaskOut)
def update_task(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    db_task = db.query(Task).filter(Task.id == task_id).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    # ✅ USER can only update assigned task
    if current_user.role != "admin":
        if db_task.assigned_to != current_user.id:
            raise HTTPException(status_code=403, detail="Not allowed")

        # ONLY status update allowed
        if task.status:
            db_task.status = task.status

    # ✅ ADMIN full update
    else:
        if task.title:
            db_task.title = task.title
        if task.description:
            db_task.description = task.description
        if task.status:
            db_task.status = task.status
        if task.assigned_to is not None:
            db_task.assigned_to = task.assigned_to

    db.commit()
    db.refresh(db_task)

    return db_task

# Delete task (Admin only)
@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user=Depends(require_admin)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"detail": "Task deleted"}


