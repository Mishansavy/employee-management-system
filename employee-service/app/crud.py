from sqlalchemy.orm import Session
from . import models, schemas

def get_employee(db: Session, employee_id: int):
    return db.query(models.Employee).filter(models.Employee.id == employee_id).first()

def get_employees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Employee).offset(skip).limit(limit).all()

def create_employee(db: Session, employee: schemas.EmployeeCreate):
    db_employee = models.Employee(name=employee.name, department_id=employee.department_id)
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee