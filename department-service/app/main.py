# from fastapi import FastAPI, Depends, HTTPException
# from sqlalchemy.orm import Session
# from fastapi.middleware.cors import CORSMiddleware

# from .import crud, models, schemas
# from .database import SessionLocal, engine

# # create all database tables
# models.Base.metadata.create_all(bind=engine)

# app = FastAPI()

# origins=["http://localhost:3000", "http://localhost:8001"]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Dependency for Database Session 
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # API Endpoints 

# @app.post("/departments/", response_model=schemas.Department)

# def create_department(department: schemas.DepartmentCreate, db: Session = Depends(get_db)):
#     """
#     Create a new Department
#     """
#     return crud.create_department(db=db, department=department)

# @app.get("/departments/{department_id}", response_model=schemas.Department)

# def read_department(department_id: int, db: Session = Depends(get_db)):
#     """
#     Retrieve a single department by its ID.
#     This endpoint is crucial for the Employment service to validate a department's existence.
#     """

#     db_department = crud.get_department(db, department_id=department_id)
#     if db_department is None:
#         raise HTTPException(status_code=404, detail="Department not found")
#     return db_department

# def read_departments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     """
#     Retrieve all departments with optional pagination.
#     """
#     departments = crud.get_departments(db, skip=skip, limit=limit)
#     return departments



from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from . import crud, models, schemas
from .database import SessionLocal, engine

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["http://localhost:3000", "http://localhost:8001"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency for Database Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API Endpoints

@app.post("/departments/", response_model=schemas.Department)
def create_department(
    department: schemas.DepartmentCreate,
    db: Session = Depends(get_db),
):
    """
    Create a new Department
    """
    return crud.create_department(db=db, department=department)

@app.get("/departments/{department_id}", response_model=schemas.Department)
def read_department(department_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a single department by its ID.
    """
    db_department = crud.get_department(db, department_id=department_id)
    if db_department is None:
        raise HTTPException(status_code=404, detail="Department not found")
    return db_department

# ✅ Register list endpoint (handles both /departments and /departments/)
@app.get("/departments/", response_model=List[schemas.Department])
@app.get("/departments", response_model=List[schemas.Department])
def read_departments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all departments with optional pagination.
    """
    return crud.get_departments(db, skip=skip, limit=limit)
