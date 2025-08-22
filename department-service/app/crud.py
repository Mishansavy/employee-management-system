from sqlalchemy.orm import Session
from . import models, schemas

def get_department(db: Session, department_id: int):
    """
    Fetch a single department by its ID.
    """
    return db.query(models.Department).filter(models.Department.id == department_id).first()

def get_departments(db: Session, skip: int = 0, limit: int = 100):
    """
    Fetch all departments with pagination.
    """
    return db.query(models.Department).offset(skip).limit(limit).all()

def create_department(db: Session, department: schemas.DepartmentCreate):
    """
    Create a new department record in the database
    """
    db_department = models.Department(name=department.name)
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department

