"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [recruitmentStats] = useState({
    totalApplicants: 100,
    shortlisted: 35,
    hired: 8,
    rejected: 65,
    costPerHire: "17K",
    timeToHire: 15,
    timeToFill: 26,
  });

  const departmentData = [
    { name: "Marketing", value: 27.33, color: "#FFB800" },
    { name: "Accounts", value: 22, color: "#FF4D6D" },
    { name: "Analytics", value: 22, color: "#FF8C42" },
    { name: "IT", value: 16.5, color: "#4B3FD8" },
    { name: "Operations", value: 7.5, color: "#38BDF8" },
    { name: "HR", value: 4.6, color: "#FB7185" },
  ];

  const genderData = [
    { name: "Male", value: 59.74, color: "#38BDF8" },
    { name: "Female", value: 40.26, color: "#4B3FD8" },
  ];

  const applicationSourceData = [
    { name: "Job Boards", value: 31 },
    { name: "Website", value: 28 },
    { name: "Social Media", value: 21 },
    { name: "Referral", value: 20 },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="p-6 space-y-6 lg:ml-64 transition-all duration-300">
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-2xl font-bold text-gray-800">
          HR Recruitment Dashboard
        </h1>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Applicants</p>
          <p className="text-2xl font-bold mt-2">
            {recruitmentStats.totalApplicants}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Shortlisted Candidates</p>
          <p className="text-2xl font-bold mt-2">
            {recruitmentStats.shortlisted}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Hired Candidates</p>
          <p className="text-2xl font-bold mt-2">{recruitmentStats.hired}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Rejected Candidates</p>
          <p className="text-2xl font-bold mt-2">{recruitmentStats.rejected}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Cost per Hire</p>
          <p className="text-2xl font-bold mt-2">
            ${recruitmentStats.costPerHire}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Time to Hire (Days)</p>
          <p className="text-2xl font-bold mt-2">
            {recruitmentStats.timeToHire}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Time to Fill (Days)</p>
          <p className="text-2xl font-bold mt-2">
            {recruitmentStats.timeToFill}
          </p>
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <motion.div
          className="bg-white rounded-lg shadow p-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-lg font-semibold mb-4">
            Open Position by Department
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {departmentData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Gender Distribution */}
        <motion.div
          className="bg-white rounded-lg shadow p-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-lg font-semibold mb-4">Gender Ratio</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {genderData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Application Source */}
        <motion.div
          className="bg-white rounded-lg shadow p-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-lg font-semibold mb-4">
            Application Received by Source
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationSourceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4B3FD8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Offer Acceptance Rate */}
        <motion.div
          className="bg-white rounded-lg shadow p-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-lg font-semibold mb-4">Offer Acceptance Rate</h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-green-500">72.73%</p>
              <p className="text-sm text-gray-600">Offer Acceptance Ratio</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Offers Accepted: 8</p>
              <p className="text-sm text-gray-600">Offers Provided: 11</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
