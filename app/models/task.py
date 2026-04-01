from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime
from app.db.session import Base
import enum
from datetime import datetime

class TaskStatus(str, enum.Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(1024), nullable=True)
    status = Column(Enum(TaskStatus), default=TaskStatus.pending)

    assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)  # optional assignment
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)