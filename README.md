# Full-Stack Employee Management System (Microservices)

This project is a complete full-stack application demonstrating a microservices architecture. It includes two backend services built with Python (FastAPI) and a frontend dashboard built with Next.js and TypeScript.

The primary goal is to showcase inter-service communication on the backend and how a frontend client can consume data from multiple, independent microservices.

---

## Architecture Overview

The system is composed of three separate applications:

1.  **Department Service (Backend)**

    - **Framework**: FastAPI
    - **Database**: PostgreSQL (`department_db`)
    - **Port**: `8000`
    - **Responsibilities**: Handles all CRUD (Create, Read, Update, Delete) operations for company departments.

2.  **Employee Service (Backend)**

    - **Framework**: FastAPI
    - **Database**: PostgreSQL (`employee_db`)
    - **Port**: `8001`
    - **Responsibilities**: Handles all CRUD operations for employees. It communicates directly with the **Department Service** via an HTTP API call to validate that an employee's assigned department exists.

3.  **Dashboard (Frontend)**
    - **Framework**: Next.js 14 with TypeScript
    - **Port**: `3000`
    - **Responsibilities**: Provides a user interface to view and manage both departments and employees by making API calls to the respective backend services.

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Python** (3.8 or newer)
- **Node.js** (18.x or newer)
- **npm** or **yarn**
- **PostgreSQL** (and a running instance)

---

## Getting Started

Follow these steps to set up and run the entire application.

### 1. Database Setup

First, you need to create the two separate databases required by the backend services. Open `psql` or your preferred PostgreSQL client and run the following commands:

```sql
CREATE DATABASE department_db;
CREATE DATABASE employee_db;
2. Run the Department Service
Open a new terminal and run the following commands:

Bash

# Navigate to the service directory
cd department-service

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the service
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
The Department Service will now be running on http://localhost:8000.

3. Run the Employee Service
Open a second, separate terminal:

Bash

# Navigate to the service directory
cd employee-service

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the service
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
The Employee Service will now be running on http://localhost:8001.

4. Run the Frontend Dashboard
Open a third, separate terminal:

Bash

# Navigate to the frontend directory
cd dashboard-frontend

# Install dependencies
npm install

# Run the development server
npm run dev
The Next.js application will now be available at http://localhost:3000.

How to Use the Application
Open your browser and navigate to http://localhost:3000.

Click on the Departments link in the navigation bar.

Create a few departments (e.g., "Engineering", "Marketing", "HR"). You should see them appear in the list below the form.

Click on the Employees link.

Create a new employee. The "Select a department" dropdown will be populated with the departments you just created.

When you add an employee, the frontend sends a request to the Employee Service. This service then makes a synchronous API call to the Department Service to verify the department ID is valid before saving the new employee to its own database.
```
