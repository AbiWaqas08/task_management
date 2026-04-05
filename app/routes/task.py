# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from sqlalchemy import or_
# from typing import List

# from app.db.init_db import get_db
# from app.models.task import Task, TaskStatus
# from app.schemas.task import TaskCreate, TaskOut, TaskUpdate
# from app.routes.auth import get_current_user
# from app.models.user import User

# router = APIRouter(prefix="/tasks", tags=["tasks"])

# # -----------------------------
# # Create Task
# # -----------------------------
# @router.post("/", response_model=TaskOut)
# def create_task(
#     task: TaskCreate,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     new_task = Task(
#         title=task.title,
#         description=task.description,
#         status=task.status,
#         assigned_to=task.assigned_to,
#         created_by=current_user.id
#     )

#     db.add(new_task)
#     db.commit()
#     db.refresh(new_task)

#     return new_task


# # -----------------------------
# # Get All Tasks
# # -----------------------------
# @router.get("/", response_model=List[TaskOut])
# def get_tasks(
#     status: TaskStatus = None,
#     assigned_to: int = None,
#     skip: int = 0,
#     limit: int = 10,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     query = db.query(Task)

#     # -----------------------------
#     # Role-based filtering
#     # -----------------------------
#     if current_user.role != "admin":
#         query = query.filter(
#             or_(
#                 Task.created_by == current_user.id,
#                 Task.assigned_to == current_user.id
#             )
#         )

#     # -----------------------------
#     # Apply filters
#     # -----------------------------
#     if status:
#         query = query.filter(Task.status == status)

#     if assigned_to:
#         query = query.filter(Task.assigned_to == assigned_to)

#     # -----------------------------
#     # Pagination
#     # -----------------------------
#     tasks = query.offset(skip).limit(limit).all()

#     return tasks


# # -----------------------------
# # Get Single Task
# # -----------------------------
# @router.get("/{task_id}", response_model=TaskOut)
# def get_task(
#     task_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     task = db.query(Task).filter(Task.id == task_id).first()

#     if not task:
#         raise HTTPException(status_code=404, detail="Task not found")

#     # Authorization check
#     if current_user.role != "admin":
#         if task.created_by != current_user.id and task.assigned_to != current_user.id:
#             raise HTTPException(status_code=403, detail="Not authorized")

#     return task


# # -----------------------------
# # Update Task
# # -----------------------------
# @router.put("/{task_id}", response_model=TaskOut)
# def update_task(
#     task_id: int,
#     task_update: TaskUpdate,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     task = db.query(Task).filter(Task.id == task_id).first()

#     if not task:
#         raise HTTPException(status_code=404, detail="Task not found")

#     # Only admin or creator can update
#     if current_user.role != "admin" and task.created_by != current_user.id:
#         raise HTTPException(status_code=403, detail="Not authorized")

#     # Update fields dynamically
#     for key, value in task_update.dict(exclude_unset=True).items():
#         setattr(task, key, value)

#     db.commit()
#     db.refresh(task)

#     return task


# # -----------------------------
# # Delete Task
# # -----------------------------
# @router.delete("/{task_id}")
# def delete_task(
#     task_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     task = db.query(Task).filter(Task.id == task_id).first()

#     if not task:
#         raise HTTPException(status_code=404, detail="Task not found")

#     # Only admin or creator can delete
#     if current_user.role != "admin" and task.created_by != current_user.id:
#         raise HTTPException(status_code=403, detail="Not authorized")

#     db.delete(task)
#     db.commit()

#     return {"detail": "Task deleted successfully"}


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.init_db import get_db
from app.routes.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/")
def get_tasks(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # For now return empty list
    return {"tasks": []}