import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./componenets/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Employee Management System",
  description: "Modern Employee Management Solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
