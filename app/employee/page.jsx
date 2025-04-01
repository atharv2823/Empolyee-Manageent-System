"use client";
import { useState, useEffect } from "react";
import Sidebar from "../componenets/Sidebar";
import Image from "next/image";
import supabase from "@/supabase/supabase";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase.from("employee").select("*");

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    number: "",
    dob: "",
    address: "",
    email: "",
    department: "IT",
    hire_date: "",
    role: "", // Add role field
  });

  // Add these handlers before return statement
  const generateEmployeeId = () => {
    const prefix = "EMP";
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${prefix}${timestamp}${random}`;
  };

  const handleNewEmployeeInput = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const employeeId = generateEmployeeId();
      const { error } = await supabase.from("employee").insert([
        {
          emp_id: employeeId,
          ...newEmployee,
        },
      ]);

      if (error) throw error;

      fetchEmployees();
      setNewEmployee({
        name: "",
        number: "",
        dob: "",
        address: "",
        email: "",
        department: "IT",
        hire_date: "",
      });

      alert(`Employee added successfully! Employee ID: ${employeeId}`);
    } catch (error) {
      console.error("Error adding employee:", error.message);
      alert("Error adding employee. Please try again.");
    }
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Add edit handler
  const handleEdit = async (employee) => {
    setEditingEmployee({ ...employee });
    setEditDialogOpen(true);
    setActiveDropdown(null);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      const { error } = await supabase
        .from("employee")
        .update(editingEmployee)
        .eq("emp_id", editingEmployee.emp_id);

      if (error) throw error;

      setEditDialogOpen(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error.message);
    }
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  // Add delete handler
  const handleDelete = async (empId, empName) => {
    if (
      window.confirm(`Are you sure you want to delete employee "${empName}"?`)
    ) {
      try {
        const { error } = await supabase
          .from("employee")
          .delete()
          .eq("emp_id", empId);

        if (error) throw error;

        // Refresh the employee list
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        {/* Main Content */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  COMPANY EMPLOYEES
                </h2>
                <div className="flex space-x-3">
                  <div className="flex space-x-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">
                          Add Employee
                        </button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add New Employee</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={handleAddEmployee}
                          className="space-y-4 mt-4"
                        >
                          <ScrollArea className="h-[400px] pr-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={newEmployee.name}
                                onChange={handleNewEmployeeInput}
                                className="mt-1 text-black block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                name="number"
                                value={newEmployee.number}
                                onChange={handleNewEmployeeInput}
                                className="mt-1 text-black block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Date of Birth
                              </label>
                              <input
                                type="date"
                                name="dob"
                                value={newEmployee.dob}
                                onChange={handleNewEmployeeInput}
                                className="mt-1 text-black block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Address
                              </label>
                              <textarea
                                name="address"
                                value={newEmployee.address}
                                onChange={handleNewEmployeeInput}
                                rows="3"
                                className="mt-1 text-black block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                              ></textarea>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Email
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={newEmployee.email}
                                onChange={handleNewEmployeeInput}
                                className="mt-1 text-black block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Hire Date
                              </label>
                              <input
                                type="date"
                                name="hire_date"
                                value={newEmployee.hire_date}
                                onChange={handleNewEmployeeInput}
                                className="mt-1 text-black block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Department
                              </label>
                              <select
                                name="department"
                                value={newEmployee.department}
                                onChange={handleNewEmployeeInput}
                                className="mt-1 text-black block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                              >
                                <option value="IT">IT</option>
                                <option value="HR">HR</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                                <option value="Operations">Operations</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Role
                              </label>
                              <select
                                name="role"
                                value={newEmployee.role}
                                onChange={handleNewEmployeeInput}
                                className="mt-1 text-black block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                              >
                                <option value="">Select Role</option>
                                <option value="Manager">Manager</option>
                                <option value="Team Lead">Team Lead</option>
                                <option value="Senior Developer">
                                  Senior Developer
                                </option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="HR Specialist">
                                  HR Specialist
                                </option>
                                <option value="Marketing Specialist">
                                  Marketing Specialist
                                </option>
                                <option value="Financial Analyst">
                                  Financial Analyst
                                </option>
                                <option value="Operations Manager">
                                  Operations Manager
                                </option>
                              </select>
                            </div>
                          </ScrollArea>
                          <div className="flex justify-end space-x-3 pt-4">
                            <DialogTrigger asChild>
                              <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                              >
                                Cancel
                              </button>
                            </DialogTrigger>
                            <button
                              type="submit"
                              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                              Add Employee
                            </button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
                      Import Employees
                    </button>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex-1 max-w-sm">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Employee"
                      className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-16 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-16 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hire Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.emp_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.emp_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-blue-600">
                              {employee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {employee.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.role || "Employee"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.hire_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                        <button
                          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all duration-200"
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === employee.emp_id
                                ? null
                                : employee.emp_id
                            )
                          }
                        >
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>

                        {activeDropdown === employee.emp_id && (
                          <div className="absolute right-0 mt-2 mr-4 w-32 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 transform transition-all duration-200 ease-out">
                            <div className="py-1">
                              <button
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-2xl hover:text-blue-600 transition-colors duration-150"
                                onClick={() => handleEdit(employee)}
                              >
                                <svg
                                  className="h-4 w-4 mr-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                Edit
                              </button>
                              <button
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 rounded-2xl"
                                onClick={() => {
                                  handleDelete(employee.emp_id, employee.name);
                                  setActiveDropdown(null);
                                }}
                              >
                                <svg
                                  className="h-4 w-4 mr-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={editingEmployee?.name || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact
              </label>
              <input
                type="tel"
                name="number"
                value={editingEmployee?.number || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={editingEmployee?.email || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hire Date
              </label>
              <input
                type="date"
                name="hire_date"
                value={editingEmployee?.hire_date || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                value={editingEmployee?.department || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={editingEmployee?.role || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="Manager">Manager</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="HR Specialist">HR Specialist</option>
                <option value="Marketing Specialist">
                  Marketing Specialist
                </option>
                <option value="Financial Analyst">Financial Analyst</option>
                <option value="Operations Manager">Operations Manager</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setEditDialogOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
