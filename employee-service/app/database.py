from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()
# --- Database URL ---
# This service connects to its own, separate database.
employee_DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(employee_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()