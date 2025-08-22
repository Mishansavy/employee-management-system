# Full-Stack Employee Management System (Microservices)

This project is a **full-stack application** demonstrating a **microservices architecture**.  
It consists of two backend services (Python/FastAPI) and a frontend dashboard (Next.js/TypeScript).

The goal is to showcase **inter-service communication** on the backend and how a frontend client can consume data from multiple independent microservices.

---

## 🚀 Architecture Overview

The system is composed of **three separate applications**:

### 1. Department Service (Backend)

- **Framework:** FastAPI
- **Database:** PostgreSQL (`department_db`)
- **Port:** `8000`
- **Responsibilities:**
  - Handles all **CRUD** operations for company departments.

### 2. Employee Service (Backend)

- **Framework:** FastAPI
- **Database:** PostgreSQL (`employee_db`)
- **Port:** `8001`
- **Responsibilities:**
  - Handles all **CRUD** operations for employees.
  - Communicates with the **Department Service** (via HTTP API call) to validate an employee’s assigned department.

### 3. Dashboard (Frontend)

- **Framework:** Next.js 14 + TypeScript
- **Port:** `3000`
- **Responsibilities:**
  - Provides a **user interface** to view and manage both departments and employees.
  - Consumes APIs from the backend services.

---

## 📦 Prerequisites

Make sure you have the following installed:

- Python **3.8+**
- Node.js **18.x+**
- npm or yarn
- PostgreSQL (running instance)

---

## ⚙️ Getting Started

Follow these steps to set up and run the system:

### 1. Database Setup

Create the two required databases:

\`\`\`sql
CREATE DATABASE department_db;
CREATE DATABASE employee_db;
\`\`\`

### 2. Run the Department Service

\`\`\`bash

# Navigate to the service directory

cd department-service

# Create and activate a virtual environment

python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate

# Install dependencies

pip install -r requirements.txt

# Run the service

uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
\`\`\`

✅ The Department Service runs at: [http://localhost:8000](http://localhost:8000)

### 3. Run the Employee Service

\`\`\`bash

# Navigate to the service directory

cd employee-service

# Create and activate a virtual environment

python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate

# Install dependencies

pip install -r requirements.txt

# Run the service

uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
\`\`\`

✅ The Employee Service runs at: [http://localhost:8001](http://localhost:8001)

### 4. Run the Frontend Dashboard

\`\`\`bash

# Navigate to the frontend directory

cd dashboard-frontend

# Install dependencies

npm install

# Run the development server

npm run dev
\`\`\`

✅ The Dashboard runs at: [http://localhost:3000](http://localhost:3000)

---

## 🖥️ How to Use the Application

1. Open your browser at [http://localhost:3000](http://localhost:3000).
2. Navigate to **Departments**:
   - Create departments (e.g., `Engineering`, `Marketing`, `HR`).
   - They’ll appear in the list below the form.
3. Navigate to **Employees**:
   - Create a new employee.
   - The **“Select a department”** dropdown will show the departments you created.
   - When you add an employee, the **Employee Service** calls the **Department Service** to verify the department ID before saving the record.

---

## 📚 Summary

- **Department Service** → manages departments.
- **Employee Service** → manages employees, validates departments.
- **Dashboard** → provides a UI for managing both.

This setup demonstrates how **microservices** interact and how a frontend client integrates multiple backends.

---
