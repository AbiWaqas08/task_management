from pydantic import BaseModel, EmailStr


# User Schemas
class UserCreate(BaseModel):
    name : str
    email : EmailStr
    password : str
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

    

