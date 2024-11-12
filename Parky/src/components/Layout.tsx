import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, Car, Users, Globe, LogOut, Menu } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const navItems = [
  { icon: BarChart3, label: "Analytics", path: "/" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: Car, label: "Reservations", path: "/reservations" },
  { icon: Globe, label: "Platforms", path: "/platforms" },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-50`}
      >
        <div className="flex items-center gap-2 mb-8 px-2">
          <Car className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">Parkboost</h1>
        </div>

        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <button
          onClick={handleLogout}
          className="absolute bottom-4 left-4 right-4 flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Overlay for Sidebar on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-8">
        {/* Toggle Button for Sidebar on Mobile */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-2 mb-4 text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Outlet />
      </div>
    </div>
  );
}
