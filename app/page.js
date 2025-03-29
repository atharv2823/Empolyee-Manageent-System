"use client";
import { useState } from "react";
import Sidebar from "./componenets/Sidebar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
   const [employeeStats] = useState({
     totalEmployees: 248,
     activeProjects: 12,
     departments: 8,
     attendance: "95%",
   });

   // Add new state for dialog
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [newEmployee, setNewEmployee] = useState({
     name: "",
     number: "",
     dob: "",
     address: "",
     email: "",
     department: "IT",
   });

   // Add new handlers
   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setNewEmployee((prev) => ({
       ...prev,
       [name]: value,
     }));
   };

   const handleSubmit = (e) => {
     e.preventDefault();
     console.log("New Employee Data:", newEmployee);
     setIsDialogOpen(false);
     setNewEmployee({
       name: "",
       number: "",
       dob: "",
       address: "",
       email: "",
       department: "IT",
     });
   };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                EMS Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base">
                    Add Employee
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form className="space-y-4 mt-4">
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-semibold text-gray-900">
                            Add New Employee
                          </h2>
                          <button
                            onClick={() => setIsDialogOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={newEmployee.name}
                              onChange={handleInputChange}
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
                              onChange={handleInputChange}
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
                              onChange={handleInputChange}
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
                              onChange={handleInputChange}
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
                              onChange={handleInputChange}
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
                              onChange={handleInputChange}
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
                          <div className="flex justify-end space-x-3 pt-4">
                            <button
                              type="submit"
                              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                              Add Employee
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/* ... rest of the form fields remain the same ... */}
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
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
            {Object.entries({
              "Total Employees": employeeStats.totalEmployees,
              "Active Projects": employeeStats.activeProjects,
              Departments: employeeStats.departments,
              "Total Attendance": employeeStats.attendance,
            }).map(([title, value], index) => (
              <div
                key={index}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div
                        className={`bg-${
                          ["blue", "green", "yellow", "purple"][index]
                        }-500 rounded-md p-2 sm:p-3`}
                      ></div>
                    </div>
                    <div className="ml-4 sm:ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {title}
                        </dt>
                        <dd className="text-lg font-semibold text-gray-900">
                          {value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg mb-6 sm:mb-8">
            <div className="p-4 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  "View Employees",
                  "Manage Departments",
                  "View Attendance",
                  "Generate Reports",
                ].map((text, index) => (
                  <button
                    key={index}
                    className="p-3 sm:p-4 border rounded-lg hover:bg-gray-50 text-center transition-colors duration-200"
                  >
                    <span className="block text-sm font-medium text-gray-900">
                      {text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-4 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Recent Activities
              </h2>
              <div className="flow-root">
                <ul className="-mb-8">
                  {[
                    { text: "New employee John Doe added", time: "1h ago" },
                    {
                      text: "Department update: IT Department",
                      time: "3h ago",
                    },
                    { text: "Attendance report generated", time: "5h ago" },
                  ].map((activity, index) => (
                    <li key={index} className="pb-4">
                      <div className="relative flex space-x-3">
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              {activity.text}
                            </p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
