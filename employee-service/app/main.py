from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import requests

from . import crud, models, schemas
from .database import SessionLocal, engine

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- CORS Middleware ---
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Dependency for Database Session ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Inter-Service Communication ---
# URL for the department service
DEPARTMENT_SERVICE_URL = "http://localhost:8000/departments/"

def validate_department_id(department_id: int):
    """
    Calls the Department Service to check if a department ID is valid.
    """
    try:
        response = requests.get(f"{DEPARTMENT_SERVICE_URL}{department_id}")
        if response.status_code == 200:
            return True
        return False
    except requests.exceptions.RequestException:
        # This handles cases where the department service is down or unreachable
        raise HTTPException(status_code=503, detail="Department service is unavailable")


# --- API Endpoints ---

@app.post("/employees/", response_model=schemas.Employee)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    """
    Create a new employee.
    Before creating, it validates the department_id by calling the Department Service.
    """
    if not validate_department_id(employee.department_id):
        raise HTTPException(status_code=400, detail=f"Department with id {employee.department_id} does not exist.")
    
    return crud.create_employee(db=db, employee=employee)


@app.get("/employees/", response_model=list[schemas.Employee])
def read_employees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all employees with pagination.
    """
    employees = crud.get_employees(db, skip=skip, limit=limit)
    return employees

@app.get("/employees/{employee_id}", response_model=schemas.Employee)
def read_employee(employee_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a single employee by their ID.
    """
    db_employee = crud.get_employee(db, employee_id=employee_id)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee