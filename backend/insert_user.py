from database import engine
from models import User

user = User(name="Arun")

with engine.begin() as connection:
    connection.execute(
        user.__table__.insert(),
        {"name": user.name}
    )

print("User inserted successfully")
