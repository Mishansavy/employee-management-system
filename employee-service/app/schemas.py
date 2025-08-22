from pydantic import BaseModel

class EmployeeCreate(BaseModel):
    name: str
    department_id: int

class Employee(BaseModel):
    id: int
    name: str
    department_id: int

    class Config:
        from_attributes = True