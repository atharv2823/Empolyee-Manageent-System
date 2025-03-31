"use client";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
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
  const [date, setDate] = useState("23/12/2020");

  const workTrendsData = {
    labels: [
      "Present",
      "Absent",
      "On Time",
      "Late",
      "Overtime",
      "Remote",
      "Permission",
      "Transfer",
    ],
    datasets: [
      {
        label: "November",
        data: [100, 65, 45, 30, 85, 35, 25, 70],
        backgroundColor: "rgba(203, 213, 225, 0.8)",
      },
      {
        label: "December",
        data: [105, 70, 50, 25, 90, 40, 20, 65],
        backgroundColor: "rgba(147, 197, 253, 0.8)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="lg:ml-64 p-6">
      {/* Search and Filter Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 rounded-md border"
          />
          <button className="p-2 bg-gray-100 rounded-md">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Overview Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">OVERVIEW</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">DATE</p>
            <p className="text-lg font-semibold">{date}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">TOTAL EMPLOYEES</p>
            <p className="text-lg font-semibold">115</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">PRESENT</p>
            <p className="text-lg font-semibold">90</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">ON LEAVE</p>
            <p className="text-lg font-semibold">15</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">LATE</p>
            <p className="text-lg font-semibold">10</p>
          </div>
        </div>

        {/* Rates Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-sm font-semibold mb-2">ABSENCE RATE</h3>
            <p className="text-2xl font-bold">8%</p>
            <p className="text-xs text-green-500">↑ 3% from previous month</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-sm font-semibold mb-2">OVERTIME RATE</h3>
            <p className="text-2xl font-bold">8%</p>
            <p className="text-xs text-green-500">↑ 3% from previous month</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-sm font-semibold mb-2">LATECOMER RATE</h3>
            <p className="text-2xl font-bold">8%</p>
            <p className="text-xs text-green-500">↑ 3% from previous month</p>
          </div>
        </div>
      </div>

      {/* Work Trends Graph */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">WORK TRENDS</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <Bar data={workTrendsData} options={options} height={100} />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Holidays Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">HOLIDAYS</h2>
            <span className="text-sm text-gray-500">23 DECEMBER 2020</span>
          </div>
          <div className="space-y-4">
            {/* Holiday entries */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">Sick leave</p>
                </div>
              </div>
              <span className="text-sm">Today</span>
            </div>
            {/* Add more holiday entries as needed */}
          </div>
        </div>

        {/* Remote Work Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">REMOTE WORK</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">23 DECEMBER 2020</span>
              <span className="text-sm font-semibold">7/100</span>
            </div>
          </div>
          <div className="space-y-4">
            {/* Remote work entries */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">Designer</p>
                </div>
              </div>
              <span className="text-sm">Today</span>
            </div>
            {/* Add more remote work entries as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}
