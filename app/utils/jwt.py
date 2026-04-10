import os
from jose import jwt
from dotenv import load_dotenv

from fastapi import HTTPException


load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM") or "HS256"

def create_access_token(data: dict):
    """
    Create JWT token. `data` should include {"sub": user_email}.
    """
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except:
        raise HTTPException(status_code=401, detail="Invalid token")