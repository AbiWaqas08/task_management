from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.init_db import get_db
from app.models.comment import Comment
from app.models.task import Task
from app.models.user import User
from app.schemas.comment import CommentCreate, CommentOut
from app.routes.auth import get_current_user

router = APIRouter(prefix="/comments", tags=["comments"])


# add comment
@router.post("/{task_id}", response_model=CommentOut)
def add_comment(
    task_id: int,
    comment: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # authorization (same logic as tasks)
    if current_user.role != "admin":
        if task.created_by != current_user.id and task.assigned_to != current_user.id:
            raise HTTPException(status_code=403, detail="Not authorized")

    new_comment = Comment(
        content=comment.content,
        task_id=task_id,
        user_id=current_user.id
    )

    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)

    return new_comment


# get comment
@router.get("/{task_id}", response_model=List[CommentOut])
def get_comments(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if current_user.role != "admin":
        if task.created_by != current_user.id and task.assigned_to != current_user.id:
            raise HTTPException(status_code=403, detail="Not authorized")

    return db.query(Comment).filter(Comment.task_id == task_id).all()