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
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState("month");
  const [isCollapsed, setIsCollapsed] = useState(false);

   const fadeInUp = {
     initial: { opacity: 0, y: 20 },
     animate: { opacity: 1, y: 0 },
     transition: { duration: 0.5 },
   };

  // ... existing stats ...

  // New data for additional sections
  const attendanceData = [
    { date: "Mon", present: 95, absent: 5, late: 3 },
    { date: "Tue", present: 92, absent: 8, late: 4 },
    { date: "Wed", present: 88, absent: 12, late: 6 },
    { date: "Thu", present: 94, absent: 6, late: 2 },
    { date: "Fri", present: 90, absent: 10, late: 5 },
  ];

  const projectsData = [
    {
      name: "Website Redesign",
      progress: 75,
      status: "On Track",
      department: "IT",
    },
    {
      name: "Marketing Campaign",
      progress: 60,
      status: "Delayed",
      department: "Marketing",
    },
    {
      name: "Financial Audit",
      progress: 90,
      status: "On Track",
      department: "Finance",
    },
    {
      name: "HR System Update",
      progress: 45,
      status: "At Risk",
      department: "HR",
    },
  ];

  const companyProgressData = [
    { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
    { month: "Feb", revenue: 52000, expenses: 34000, profit: 18000 },
    { month: "Mar", revenue: 49000, expenses: 31000, profit: 18000 },
    { month: "Apr", revenue: 58000, expenses: 36000, profit: 22000 },
    { month: "May", revenue: 55000, expenses: 35000, profit: 20000 },
  ];

   

   // Add this departmentData array
   const departmentData = [
     { name: "Marketing", value: 27.33, color: "#FFB800" },
     { name: "Accounts", value: 22, color: "#FF4D6D" },
     { name: "Analytics", value: 22, color: "#FF8C42" },
     { name: "IT", value: 16.5, color: "#4B3FD8" },
     { name: "Operations", value: 7.5, color: "#38BDF8" },
     { name: "HR", value: 4.6, color: "#FB7185" },
   ];


   return (
     <div
       className={`p-6 space-y-6 transition-all duration-300 ${
         isCollapsed ? "lg:ml-20" : "lg:ml-64"
       }`}
     >
       {/* Time Filter */}
       <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold text-gray-800">
           Dashboard Overview
         </h1>
         <div className="flex gap-2">
           {["day", "week", "month", "year"].map((filter) => (
             <button
               key={filter}
               onClick={() => setTimeFilter(filter)}
               className={`px-4 py-2 rounded-md ${
                 timeFilter === filter
                   ? "bg-blue-600 text-white"
                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
               }`}
             >
               {filter.charAt(0).toUpperCase() + filter.slice(1)}
             </button>
           ))}
         </div>
       </div>

       {/* Existing Stats Cards */}
       {/* ... your existing stats cards code ... */}

       {/* New Sections */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Attendance Overview */}
         <motion.div
           className="bg-white rounded-lg shadow p-6"
           variants={fadeInUp}
           initial="initial"
           animate="animate"
         >
           <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={attendanceData}>
                 <XAxis dataKey="date" />
                 <YAxis />
                 <Tooltip />
                 <Legend />
                 <Area
                   type="monotone"
                   dataKey="present"
                   stackId="1"
                   stroke="#4CAF50"
                   fill="#4CAF50"
                   fillOpacity={0.6}
                 />
                 <Area
                   type="monotone"
                   dataKey="absent"
                   stackId="1"
                   stroke="#f44336"
                   fill="#f44336"
                   fillOpacity={0.6}
                 />
                 <Area
                   type="monotone"
                   dataKey="late"
                   stackId="2"
                   stroke="#ff9800"
                   fill="#ff9800"
                   fillOpacity={0.6}
                 />
               </AreaChart>
             </ResponsiveContainer>
           </div>
         </motion.div>

         {/* Running Projects */}
         <motion.div
           className="bg-white rounded-lg shadow p-6"
           variants={fadeInUp}
           initial="initial"
           animate="animate"
         >
           <h2 className="text-lg font-semibold mb-4">Project Status</h2>
           <div className="space-y-4">
             {projectsData.map((project, index) => (
               <div key={index} className="border-b pb-4">
                 <div className="flex justify-between items-center mb-2">
                   <span className="font-medium">{project.name}</span>
                   <span
                     className={`px-2 py-1 rounded-full text-xs ${
                       project.status === "On Track"
                         ? "bg-green-100 text-green-800"
                         : project.status === "Delayed"
                         ? "bg-yellow-100 text-yellow-800"
                         : "bg-red-100 text-red-800"
                     }`}
                   >
                     {project.status}
                   </span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-2.5">
                   <div
                     className="bg-blue-600 h-2.5 rounded-full"
                     style={{ width: `${project.progress}%` }}
                   ></div>
                 </div>
                 <div className="flex justify-between mt-2 text-sm text-gray-600">
                   <span>{project.department}</span>
                   <span>{project.progress}%</span>
                 </div>
               </div>
             ))}
           </div>
         </motion.div>

         {/* Company Progress */}
         <motion.div
           className="bg-white rounded-lg shadow p-6 lg:col-span-2"
           variants={fadeInUp}
           initial="initial"
           animate="animate"
         >
           <h2 className="text-lg font-semibold mb-4">Company Progress</h2>
           <div className="h-80">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={companyProgressData}>
                 <XAxis dataKey="month" />
                 <YAxis />
                 <Tooltip />
                 <Legend />
                 <Line
                   type="monotone"
                   dataKey="revenue"
                   stroke="#4B3FD8"
                   strokeWidth={2}
                 />
                 <Line
                   type="monotone"
                   dataKey="expenses"
                   stroke="#FF4D6D"
                   strokeWidth={2}
                 />
                 <Line
                   type="monotone"
                   dataKey="profit"
                   stroke="#4CAF50"
                   strokeWidth={2}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
         </motion.div>
       </div>

       {/* Department Performance */}
       <motion.div
         className="bg-white rounded-lg shadow p-6"
         variants={fadeInUp}
         initial="initial"
         animate="animate"
       >
         <h2 className="text-lg font-semibold mb-4">Department Performance</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {departmentData.map((dept, index) => (
             <div key={index} className="border rounded-lg p-4">
               <div className="flex justify-between items-center mb-2">
                 <span className="font-medium">{dept.name}</span>
                 <div
                   className="w-3 h-3 rounded-full"
                   style={{ backgroundColor: dept.color }}
                 ></div>
               </div>
               <div className="text-2xl font-bold mb-1">{dept.value}%</div>
               <div className="w-full bg-gray-200 rounded-full h-2">
                 <div
                   className="rounded-full h-2"
                   style={{
                     width: `${dept.value}%`,
                     backgroundColor: dept.color,
                   }}
                 ></div>
               </div>
             </div>
           ))}
         </div>
       </motion.div>
     </div>
   );
}
