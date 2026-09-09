from sqlalchemy import select
from database import engine
from models import User

with engine.connect() as connection:
    result = connection.execute(select(User))

    for user in result:
        print(user.id, user.name)
