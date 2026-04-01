from pydantic import BaseModel, EmailStr, Field


# User Schemas
class UserCreate(BaseModel):
    name : str
    email : EmailStr
    password : str = Field(..., min_length=6, max_length=72) 
    role : str = "user"


class UserOut(BaseModel):
    id : int
    name : str
    email : EmailStr
    role : str

    class config:
        orm_mode = True


class UserLogin(BaseModel):
    email : EmailStr
    password : str



