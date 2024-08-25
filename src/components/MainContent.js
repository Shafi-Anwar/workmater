"use client"
import { useState } from "react";

export default function MainContent() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2 px-4 rounded-lg ${
              activeTab === "overview"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-2 px-4 rounded-lg ${
              activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`py-2 px-4 rounded-lg ${
              activeTab === "settings"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Settings
          </button>
        </div>
      </div>
      <div>
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p>Here is an overview of your data and activities.</p>
            {/* Add widgets or sections for the overview here */}
          </div>
        )}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-semibold">Profile</h2>
            <p>Manage your profile details here.</p>
            {/* Add profile management components here */}
          </div>
        )}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-xl font-semibold">Settings</h2>
            <p>Customize your settings here.</p>
            {/* Add settings components here */}
          </div>
        )}
      </div>
    </div>
  );
}
