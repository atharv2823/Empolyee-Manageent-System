"use client";
import { useState } from "react";
import Sidebar from "../componenets/Sidebar";
import Image from "next/image";

export default function Home() {
  const [employees] = useState([
    {
      id: 1,
      name: "Ethan Antonio",
      image: "/avatars/ethan.jpg",
      department: "Admin",
      contact: "+1 404-233-7961",
      email: "admin@centrevo.com",
      requests: 1,
      hireDate: "2019-06-06",
    },
    {
      id: 2,
      name: "Louis B. Kimble",
      image: "/avatars/louis.jpg",
      department: "Hardware",
      contact: "+1 404-233-7962",
      email: "louis@centrevo.com",
      requests: 0,
      hireDate: "2019-01-01",
    },
    {
      id: 3,
      name: "Calvin C. Landry",
      image: "/avatars/calvin.jpg",
      department: "Software",
      contact: "+1 404-233-7963",
      email: "calvin@centrevo.com",
      requests: 0,
      hireDate: "2019-01-15",
    },
    {
      id: 4,
      name: "Mabel L. Lee",
      image: "/avatars/mabel.jpg",
      department: "Marketing",
      contact: "+1 404-233-7964",
      email: "mabel@centrevo.com",
      requests: 3,
      hireDate: "2019-04-03",
    },
  ]);

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
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">
                    Add Employee
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
                    Import Employees
                  </button>
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
                <select className="border rounded-md px-3 py-2 text-sm text-gray-600">
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>All</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requests
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
                  {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <Image
                              className="h-10 w-10 rounded-full"
                              src={employee.image}
                              alt={employee.name}
                              width={40}
                              height={40}
                            />
                          </div>
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
                        {employee.contact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {employee.requests > 0 && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {employee.requests}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.hireDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
