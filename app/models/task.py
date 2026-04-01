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
    title = Column(String(255))
    description = Column(String(255))
    status = Column(Enum(TaskStatus), default=TaskStatus.pending)

    assigned_to = Column(Integer, ForeignKey("users.id"))
    created_by = Column(Integer, ForeignKey("users.id"))

    created_at = Column(DateTime, default=datetime.utcnow)

    