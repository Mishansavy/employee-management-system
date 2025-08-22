"use client";

import { useState } from "react";
import { Department } from "../departments/page"; // Import the type

interface DepartmentListProps {
  initialDepartments: Department[];
}

export default function DepartmentList({
  initialDepartments,
}: DepartmentListProps) {
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [error, setError] = useState("");

  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDepartmentName.trim()) {
      setError("Department name cannot be empty.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/departments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newDepartmentName }),
      });

      if (!res.ok) {
        throw new Error("Failed to create department");
      }

      const newDepartment = await res.json();
      setDepartments([...departments, newDepartment]);
      setNewDepartmentName("");
      setError("");
    } catch (err) {
      setError("Could not create department. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Department</h2>
        <form
          onSubmit={handleCreateDepartment}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            type="text"
            value={newDepartmentName}
            onChange={(e) => setNewDepartmentName(e.target.value)}
            placeholder="Enter department name"
            className="flex-grow p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Department
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Departments</h2>
        <ul className="space-y-2">
          {departments.map((dept) => (
            <li key={dept.id} className="p-3 bg-gray-100 rounded-md">
              {dept.name} (ID: {dept.id})
            </li>
          ))}
        </ul>
        {departments.length === 0 && <p>No departments found.</p>}
      </div>
    </div>
  );
}
