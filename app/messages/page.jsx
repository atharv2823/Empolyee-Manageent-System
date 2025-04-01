"use client";
import { useState } from "react";
import Sidebar from "../componenets/Sidebar";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Messages() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messageType, setMessageType] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [sendVia, setSendVia] = useState("email");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample message templates
  const messageTemplates = [
    {
      title: "Meeting Reminder",
      content:
        "This is a reminder for the team meeting scheduled for [TIME] in [LOCATION].",
    },
    {
      title: "Holiday Announcement",
      content:
        "Please note that the office will be closed on [DATE] due to [HOLIDAY].",
    },
    {
      title: "Project Update Request",
      content:
        "Kindly provide an update on your assigned tasks for [PROJECT] by [DEADLINE].",
    },
  ];

  const departments = [
    "IT",
    "HR",
    "Marketing",
    "Finance",
    "Operations",
    "Sales",
  ];

  const employees = [
    { id: 1, name: "John Doe", department: "IT" },
    { id: 2, name: "Jane Smith", department: "HR" },
    { id: 3, name: "Mike Johnson", department: "Marketing" },
    { id: 4, name: "Sarah Wilson", department: "Finance" },
  ];

  // Sample message history
  const messageHistory = [
    {
      id: 1,
      type: "all",
      subject: "Company Meeting",
      date: "2024-01-15",
      status: "sent",
    },
    {
      id: 2,
      type: "department",
      department: "IT",
      subject: "System Maintenance",
      date: "2024-01-14",
      status: "sent",
    },
    {
      id: 3,
      type: "individual",
      employee: "John Doe",
      subject: "Performance Review",
      date: "2024-01-13",
      status: "draft",
    },
  ];

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log({
      messageType,
      selectedDepartment,
      selectedEmployee,
      messageContent,
      sendVia,
    });
  };

  const handleTemplateSelect = (template) => {
    setMessageContent(template.content);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`flex-1 overflow-auto transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Messages
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Message Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleSendMessage} className="space-y-6">
                  {/* Existing form fields remain the same */}
                  {/* ... */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Send Message To
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <button
                        type="button"
                        onClick={() => setMessageType("all")}
                        className={`px-4 py-2 rounded-md ${
                          messageType === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        All Employees
                      </button>
                      <button
                        type="button"
                        onClick={() => setMessageType("department")}
                        className={`px-4 py-2 rounded-md ${
                          messageType === "department"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Department
                      </button>
                      <button
                        type="button"
                        onClick={() => setMessageType("individual")}
                        className={`px-4 py-2 rounded-md ${
                          messageType === "individual"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Individual
                      </button>
                    </div>
                  </div>

                  {/* Department Selection */}
                  {messageType === "department" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Department
                      </label>
                      <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Choose a department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Employee Selection */}
                  {messageType === "individual" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Employee
                      </label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Search employee..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <select
                          value={selectedEmployee}
                          onChange={(e) => setSelectedEmployee(e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="">Choose an employee</option>
                          {filteredEmployees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                              {emp.name} - {emp.department}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message Templates
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {messageTemplates.map((template, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleTemplateSelect(template)}
                          className="p-4 border rounded-lg hover:bg-gray-50 text-left"
                        >
                          <h3 className="font-medium mb-2">{template.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {template.content}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message Content
                    </label>
                    <textarea
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      rows={6}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Message History */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Messages</h2>
              <div className="space-y-4">
                {messageHistory.map((message) => (
                  <div
                    key={message.id}
                    className="border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{message.subject}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          message.status === "sent"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {message.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {message.type === "department"
                        ? `To: ${message.department} Department`
                        : message.type === "individual"
                        ? `To: ${message.employee}`
                        : "To: All Employees"}
                    </p>
                    <p className="text-xs text-gray-500">{message.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
