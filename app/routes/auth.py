from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer

from app.db.init_db import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserOut
from app.auth import create_access_token
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")

router = APIRouter(prefix="/auth", tags=["auth"])

'''
function to convert password
into hash password
'''
def get_password_hash(password):
    password = password[:72]
    return pwd_context.hash(password)

'''
function:
verify password and hash password
'''
def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


'''
register api:
1. check email
    if email already in datadase
        show error
    else 
        create account
        commit 
        refresh
        return user
'''
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

'''
login api:
1. check email
    if email not exist or password not match
        show error
    login successfull
    return token

'''
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    token = create_access_token({"sub" : db_user.email, "role" : db_user.role})
    return {"access token" : token, "token type" : "bearer"}


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    from app.routes.auth import verify_access_token  # your JWT token verification function
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = verify_access_token(token, credentials_exception)
    user = db.query(User).filter(User.id == payload.user_id).first()
    if user is None:
        raise credentials_exception
    return user


@router.get("/test")
def test():
    return {"message": "auth working"}