from fastapi import FastAPI
from app.db.init_db import init_db

from app.routes import auth

app = FastAPI(title="Task Management Backend")

@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/")
def root():
    return {"message" : "Api running"}

# use router
app.include_router(auth.router)