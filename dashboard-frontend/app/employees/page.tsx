import EmployeeList from "../components/EmployeeList";
import { Department } from "../departments/page"; // Re-use the department type

export interface Employee {
  id: number;
  name: string;
  department_id: number;
}

// Fetch employees from the Employee Service
async function getEmployees(): Promise<Employee[]> {
  try {
    const res = await fetch("http://localhost:8001/employees/", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch employees");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
}

// Fetch departments to populate the dropdown
async function getDepartments(): Promise<Department[]> {
  try {
    const res = await fetch("http://localhost:8000/departments/", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch departments");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
}

export default async function EmployeesPage() {
  // Fetch data from both services in parallel
  const [employees, departments] = await Promise.all([
    getEmployees(),
    getDepartments(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Employees</h1>
      <EmployeeList initialEmployees={employees} departments={departments} />
    </div>
  );
}
