"use client";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AttendancePage() {
  const [date, setDate] = useState(new Date());
  const [timeFilter, setTimeFilter] = useState("day");
  const [selectedEmployee, setSelectedEmployee] = useState("all");
 const [attendanceData, setAttendanceData] = useState({
   labels: [],
   datasets: [
     {
       label: "Attendance",
       data: [],
       backgroundColor: "rgba(147, 197, 253, 0.8)",
     },
   ],
 });

  // Mock employee data
  const employees = [
    { id: 1, name: "John Doe", department: "IT" },
    { id: 2, name: "Jane Smith", department: "HR" },
    { id: 3, name: "Mike Johnson", department: "Marketing" },
  ];

  // Mock attendance data generator
  const generateAttendanceData = (filter, employeeId) => {
    let labels = [];
    let datasets = [];

    switch (filter) {
      case "day":
        labels = [
          "9AM",
          "10AM",
          "11AM",
          "12PM",
          "1PM",
          "2PM",
          "3PM",
          "4PM",
          "5PM",
        ];
        datasets = [
          {
            label: "Hours Worked",
            data: labels.map(() => Math.floor(Math.random() * 100)),
            backgroundColor: "rgba(147, 197, 253, 0.8)",
          },
        ];
        break;

      case "week":
        labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        datasets = [
          {
            label: "Attendance",
            data: labels.map(() => Math.floor(Math.random() * 100)),
            backgroundColor: "rgba(147, 197, 253, 0.8)",
          },
        ];
        break;

      case "month":
        labels = Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`);
        datasets = [
          {
            label: "Attendance",
            data: labels.map(() => Math.floor(Math.random() * 100)),
            backgroundColor: "rgba(147, 197, 253, 0.8)",
          },
        ];
        break;

      case "year":
        labels = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        datasets = [
          {
            label: "Attendance Rate",
            data: labels.map(() => Math.floor(Math.random() * 100)),
            backgroundColor: "rgba(147, 197, 253, 0.8)",
          },
        ];
        break;
    }

    return { labels, datasets };
  };

  useEffect(() => {
    const data = generateAttendanceData(timeFilter, selectedEmployee);
    setAttendanceData(data);
  }, [timeFilter, selectedEmployee]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Attendance ${
          timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)
        }ly Report`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Attendance Rate (%)",
        },
      },
    },
  };

  return (
    <div className="lg:ml-64 p-6">
      {/* Filter Controls */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="px-4 py-2 rounded-md border"
          >
            <option value="all">All Employees</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            {["day", "week", "month", "year"].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-md ${
                  timeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <input
          type="date"
          value={format(date, "yyyy-MM-dd")}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="px-4 py-2 rounded-md border"
        />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total Working Days</h3>
          <p className="text-2xl font-bold">22</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Present Days</h3>
          <p className="text-2xl font-bold">18</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Absent Days</h3>
          <p className="text-2xl font-bold">4</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Attendance Rate</h3>
          <p className="text-2xl font-bold">82%</p>
        </div>
      </div>

      {/* Attendance Graph */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <Bar data={attendanceData} options={options} height={80} />
      </div>

      {/* Attendance Details Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check Out
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(2024, 0, index + 1), "dd MMM yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">09:00 AM</td>
                <td className="px-6 py-4 whitespace-nowrap">06:00 PM</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Present
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
