from database import engine, Base
from models import User

Base.metadata.create_all(engine)

print("Tables created successfully")
