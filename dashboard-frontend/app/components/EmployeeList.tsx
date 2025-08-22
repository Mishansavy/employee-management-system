"use client";

import { useState } from "react";
import { Employee } from "../employees/page";
import { Department } from "../departments/page";

interface EmployeeListProps {
  initialEmployees: Employee[];
  departments: Department[];
}

export default function EmployeeList({
  initialEmployees,
  departments,
}: EmployeeListProps) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [selectedDeptId, setSelectedDeptId] = useState<string>("");
  const [error, setError] = useState("");

  // Create a map for quick lookup of department names
  const departmentMap = new Map(departments.map((d) => [d.id, d.name]));

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployeeName.trim() || !selectedDeptId) {
      setError("Employee name and department are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8001/employees/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newEmployeeName,
          department_id: parseInt(selectedDeptId),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to create employee");
      }

      const newEmployee = await res.json();
      setEmployees([...employees, newEmployee]);
      setNewEmployeeName("");
      setSelectedDeptId("");
      setError("");
    } catch (err: any) {
      setError(err.message || "Could not create employee. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Employee</h2>
        <form
          onSubmit={handleCreateEmployee}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            type="text"
            value={newEmployeeName}
            onChange={(e) => setNewEmployeeName(e.target.value)}
            placeholder="Enter employee name"
            className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={selectedDeptId}
            onChange={(e) => setSelectedDeptId(e.target.value)}
            className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select a department
            </option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Employee
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Employees</h2>
        <ul className="space-y-2">
          {employees.map((emp) => (
            <li
              key={emp.id}
              className="p-3 bg-gray-100 rounded-md flex justify-between"
            >
              <span>{emp.name}</span>
              <span className="text-gray-600">
                {departmentMap.get(emp.department_id) || "Unknown Department"}
              </span>
            </li>
          ))}
        </ul>
        {employees.length === 0 && <p>No employees found.</p>}
      </div>
    </div>
  );
}
