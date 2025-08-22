import DepartmentList from "../components/DepartmentList";

// Define the type for a single department
export interface Department {
  id: number;
  name: string;
}

// Fetch data from the Department Service
// This is a React Server Component, so we can fetch data directly on the server.
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
    return []; // Return an empty array on error
  }
}

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Departments</h1>
      <DepartmentList initialDepartments={departments} />
    </div>
  );
}
