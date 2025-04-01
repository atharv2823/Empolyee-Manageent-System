"use client";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiOutlineHome, AiOutlineMessage, AiOutlineUser } from "react-icons/ai";
import { MdDashboard, MdOutlineEventNote } from "react-icons/md";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActivePage = (path) => {
    return pathname === path
      ? "bg-blue-50 text-blue-600"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-gray-100 hover:bg-gray-200"
      >
        {isMobileMenuOpen ? (
          <RxCross2 className="w-6 h-6" />
        ) : (
          <RxHamburgerMenu className="w-6 h-6" />
        )}
      </button>

      <div
        className={`fixed inset-y-0 left-0 transform lg:transform-none lg:opacity-100 lg:translate-x-0 w-64 bg-white shadow-lg transition duration-200 ease-in-out z-40 ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 lg:opacity-100"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-6 py-4 border-b">
            <img
              src="./content-management-system.png"
              alt="Company Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <div>
              <h2 className="font-bold text-xl text-gray-900">TechCorp</h2>
              <p className="text-xs text-gray-500">Employee Management</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <Link
              href="/"
              className={`flex items-center px-2 py-2 rounded-md transition-colors ${isActivePage(
                "/"
              )}`}
            >
              <AiOutlineHome className="w-5 h-5 mr-3" />
              <span>Home</span>
            </Link>

            <Link
              href="/dashboard"
              className={`flex items-center px-2 py-2 rounded-md transition-colors ${isActivePage(
                "/dashboard"
              )}`}
            >
              <MdDashboard className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/employee"
              className={`flex items-center px-2 py-2 rounded-md transition-colors ${isActivePage(
                "/employee"
              )}`}
            >
              <AiOutlineUser className="w-5 h-5 mr-3" />
              <span>Employees</span>
            </Link>

            <Link
              href="/attendance"
              className={`flex items-center px-2 py-2 rounded-md transition-colors ${isActivePage(
                "/attendance"
              )}`}
            >
              <MdOutlineEventNote className="w-5 h-5 mr-3" />
              <span>Attendance</span>
            </Link>

            <Link
              href="/messages"
              className={`flex items-center px-2 py-2 rounded-md transition-colors ${isActivePage(
                "/messages"
              )}`}
            >
              <AiOutlineMessage className="w-5 h-5 mr-3" />
              <span>Messages</span>
            </Link>
          </nav>

          <div className="border-t px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <AiOutlineUser className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@techcorp.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
