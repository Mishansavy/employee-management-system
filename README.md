# 🏢 Full-Stack Employee Management System (Microservices)

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

A complete full-stack application demonstrating a microservices architecture. This project shows how a frontend client consumes data from **independent FastAPI services**, and how **service-to-service** validation works.

---

## 🏗️ Architecture

The system is three separate apps that communicate over HTTP.  
The **Employee Service** calls the **Department Service** to validate department IDs before saving.

```mermaid
graph TD
  user(User) --> frontend[Next.js Frontend\nlocalhost:3000]
  frontend --> emp[Employee Service\nlocalhost:8001]
  frontend --> dept[Department Service\nlocalhost:8000]
  emp -- Validates Department ID --> dept
  emp --> empdb[(PostgreSQL\nemployee_db)]
  dept --> deptdb[(PostgreSQL\ndepartment_db)]
```

---

## 🥞 Technology Stack

| Role      | Technology                                  | Port |
| --------- | ------------------------------------------- | ---- |
| Frontend  | Next.js 14, TypeScript, React, Tailwind CSS | 3000 |
| Service 1 | Python, FastAPI (Employee Service)          | 8001 |
| Service 2 | Python, FastAPI (Department Service)        | 8000 |
| Databases | PostgreSQL × 2                              | 5432 |

---

## 🚀 Getting Started

Follow these steps to run the whole system locally.

### Prerequisites

- Python **3.8+**
- Node.js **18.x+**
- PostgreSQL running locally (default 5432)

---

### 1) Database Setup 🗄️

Create two databases:

```sql
CREATE DATABASE department_db;
CREATE DATABASE employee_db;
```

If you use different names/ports, make sure your service configs or environment variables match.

---

### 2) Run Backend Services ⚙️

Open **two terminals**, one for each service.

**Terminal 1: Department Service**

```bash
# Navigate to the service directory
cd department-service

# Setup and activate virtual environment
python -m venv venv
# macOS/Linux:
source venv/bin/activate
# Windows (PowerShell):
# .\venv\Scripts\Activate.ps1

# Install dependencies and run
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
# ✅ Department Service running on http://localhost:8000
```

**Terminal 2: Employee Service**

```bash
# Navigate to the service directory
cd employee-service

# Setup and activate virtual environment
python -m venv venv
# macOS/Linux:
source venv/bin/activate
# Windows (PowerShell):
# .\venv\Scripts\Activate.ps1

# Install dependencies and run
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
# ✅ Employee Service running on http://localhost:8001
```

> The Employee Service will make HTTP calls to the Department Service on `localhost:8000` to validate department IDs.

---

### 3) Run Frontend Dashboard 🖥️

Open a **third terminal** for the Next.js dashboard:

```bash
# Navigate to the frontend directory
cd dashboard-frontend

# Install dependencies and run
npm install
npm run dev
# ✅ Frontend available at http://localhost:3000
```

---

## 📖 How to Use

1. Open your browser at **http://localhost:3000**.
2. Go to **Departments** and create a few entries (e.g., “Engineering”, “HR”).
3. Go to **Employees**. The department dropdown should be populated from the Department Service.
4. Create an employee and assign them to a department.
   - This triggers the **Employee Service → Department Service** validation and writes to the **employee_db**.

---

## 🧩 Notes & Tips

- Make sure PostgreSQL is reachable on `localhost:5432`.
- If you use environment variables (recommended), set DB URLs for each service, e.g.:

  ```bash
  # department-service/.env
  DATABASE_URL=postgresql://postgres:postgres@localhost:5432/department_db

  # employee-service/.env
  DATABASE_URL=postgresql://postgres:postgres@localhost:5432/employee_db

  # Optionally, where Employee points to Department
  DEPARTMENT_API_BASE=http://localhost:8000
  ```

- If CORS gets in your way during local dev, enable `allow_origins=["http://localhost:3000"]` in each FastAPI service.

## 📜 License

MIT — use and adapt as you like.
