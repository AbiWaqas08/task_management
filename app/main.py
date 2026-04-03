from fastapi import FastAPI
from app.db.init_db import get_db

from app.routes import auth
from app.routes import task
from app.routes import comment


from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Task Management Backend")


@app.on_event("startup")
def on_startup():
    get_db()


@app.get("/")
def root():
    return {"message" : "Api running"}

# use router
app.include_router(auth.router)
app.include_router(task.router)
app.include_router(comment.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)   