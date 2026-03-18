import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { Bell } from "lucide-react";
import logo from "../assets/logo.jpeg"; 

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* Topbar */}
      <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 fixed top-0 left-0 w-full z-50">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Crestlancing" className="w-60 h-18 full object-cover" />
        </div>

        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold">
            AD
          </div>
          <Bell size={18} className="text-violet-600" />

          {/* Log Out redirects to /register */}
          <button
            className="border border-violet-500 text-sm text-violet-600 px-4 py-1.5 rounded-lg hover:bg-gray-50"
            onClick={() => navigate("/register")}
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-slate-50 p-6 ml-64 mt-20">
          {/* Render the current page */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}