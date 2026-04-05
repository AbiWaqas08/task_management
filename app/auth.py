from datetime import datetime, timedelta
from jose import JWTError, jwt
from dotenv import load_dotenv
from jose import jwt, JWTError
from fastapi import HTTPException, status
from app.models.user import User
from app.db.init_db import get_db
from sqlalchemy.orm import Session
import os

# load .env file
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

'''
function for create token
'''
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)