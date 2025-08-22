from pydantic import BaseModel

# Schema for creating a deaprtment(input)
class DepartmentCreate(BaseModel):
    name: str

class Department(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True