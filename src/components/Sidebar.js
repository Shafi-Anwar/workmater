"use client"
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [active, setActive] = useState("overview");

  const handleClick = (item) => {
    setActive(item);
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav>
        <ul>
          <li className={`mb-4 ${active === "overview" ? "bg-gray-700" : ""}`}>
            <Link
              href="/dashboard"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => handleClick("overview")}
            >
              <span className="material-icons mr-3">dashboard</span>
              Overview
            </Link>
          </li>
          <li className={`mb-4 ${active === "profile" ? "bg-gray-700" : ""}`}>
            <Link
              href="/profile"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => handleClick("profile")}
            >
              <span className="material-icons mr-3">person</span>
              Profile
            </Link>
          </li>
          <li className={`mb-4 ${active === "settings" ? "bg-gray-700" : ""}`}>
            <Link
              href="/dashboard/settings"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => handleClick("settings")}
            >
              <span className="material-icons mr-3">settings</span>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
