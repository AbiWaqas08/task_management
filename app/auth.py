from datetime import datetime, timedelta
from jose import JWTError, jwt

SECRET_KEY = "abiwaqas12345"
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60


'''
function for create token
'''
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    encode_jwt  = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encode_jwt