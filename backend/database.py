from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base


DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost/hello_arun"

engine = create_engine(DATABASE_URL)

Base = declarative_base()
