from fastapi import FastAPI
from app.db.init_db import get_db

from app.routes import auth
from app.routes import task



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



# ----------------------
# Enable CORS
# ----------------------
origins = [
    "http://localhost:5173",  # your frontend
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)   