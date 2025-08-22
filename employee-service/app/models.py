from sqlalchemy import Column, Integer, String, ForeignKey
from .database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    department_id = Column(Integer) # This is just an integer, not a foreign key to the other DB