from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import select
from database import engine
from models import User
from schemas import UserCreate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
def hello(name: str):
    return {"message": "Hello " + name}

@app.get("/users")
def get_users():

    with engine.connect() as connection:
        result = connection.execute(select(User))

        users = []

        for user in result:
            users.append({
                "id": user.id,
                "name": user.name
            })

        return users

@app.post("/users")
def create_user(user: UserCreate):

    with engine.begin() as connection:
        result = connection.execute(
            User.__table__.insert().values(name=user.name)
        )

        user_id = result.inserted_primary_key[0]

    return {
        "id": user_id,
        "name": user.name
    }
