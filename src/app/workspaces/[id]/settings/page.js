"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeContext"; // Make sure this is the correct path

export default function WorkspaceSettingsPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const { isDarkMode } = useTheme(); // Access the current theme state
  const [workspace, setWorkspace] = useState(null);
  const [newName, setNewName] = useState("");
  const [description, setDescription] = useState("");
  const [automationEnabled, setAutomationEnabled] = useState(false);
  const [automationOptions, setAutomationOptions] = useState({});
  const [newOption, setNewOption] = useState(""); // State for new automation option

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const response = await fetch(`/api/workspaces/${id}`);
        if (!response.ok) throw new Error("Failed to fetch workspace details");
        const data = await response.json();
        setWorkspace(data);
        setNewName(data.name);
        setDescription(data.description || "");
        setAutomationEnabled(data.automationEnabled || false);
        setAutomationOptions(data.automationOptions || {});
      } catch (err) {
        console.error("Error fetching workspace details:", err);
      }
    };

    fetchWorkspace();
  }, [id]);

  const updateWorkspace = async () => {
    try {
      const response = await fetch(`/api/workspaces/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          description,
          automationEnabled,
          automationOptions,
        }),
      });
      if (!response.ok) throw new Error("Failed to update workspace");
      alert("Workspace updated successfully!");
      router.push(`/workspaces/${id}`);
    } catch (err) {
      console.error("Error updating workspace:", err);
      alert("Failed to update workspace");
    }
  };

  const addAutomationOption = () => {
    if (newOption.trim() === "") return; // Don't add if input is empty
    setAutomationOptions((prev) => ({
      ...prev,
      [newOption.trim()]: false, // Add new option with default value `false`
    }));
    setNewOption(""); // Clear input field
  };

  const deleteWorkspace = async () => {
    try {
      const response = await fetch(`/api/workspaces/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/workspace-deleted"); // Redirect to a new page showing success message and tick mark
      } else {
        const errorData = await response.json();
        console.error("Failed to delete workspace:", errorData);
        alert("Failed to delete workspace");
      }
    } catch (error) {
      console.error("Error deleting workspace:", error);
      alert("Error deleting workspace");
    }
  };

  if (!workspace) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div
      className={`max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-lg ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-4xl font-bold mb-8">Workspace Settings</h1>
      <div className="space-y-6">
        <div
          className={`p-4 rounded-lg shadow-md ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <label className="block text-lg mb-2">Workspace Name</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500"
            }`}
          />
        </div>
        <div
          className={`p-4 rounded-lg shadow-md ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <label className="block text-lg mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500"
            }`}
            rows="4"
          ></textarea>
        </div>
        <div
          className={`p-4 rounded-lg shadow-md flex items-center ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <input
            type="checkbox"
            checked={automationEnabled}
            onChange={() => setAutomationEnabled(!automationEnabled)}
            className="mr-2"
          />
          <label className="text-lg">Enable Automation</label>
        </div>
        {automationEnabled && (
          <div
            className={`p-4 rounded-lg shadow-md ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-100 border-gray-300"
            } space-y-6`}
          >
            <h2 className="text-2xl font-semibold mb-4">Automation Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(automationOptions).map((key) => (
                <div
                  key={key}
                  className={`p-4 border rounded-lg shadow-sm flex items-center ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={automationOptions[key]}
                    onChange={() =>
                      setAutomationOptions((prev) => ({
                        ...prev,
                        [key]: !prev[key],
                      }))
                    }
                    className="mr-2"
                  />
                  <span className="font-semibold">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500"
                }`}
                placeholder="Add new automation option"
              />
              <button
                onClick={addAutomationOption}
                className={`mt-2 w-full py-2 rounded-lg ${
                  isDarkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } transition-colors`}
              >
                Add Option
              </button>
            </div>
          </div>
        )}
        <div className="flex gap-4">
          <button
            onClick={updateWorkspace}
            className={`w-full py-3 rounded-lg ${
              isDarkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } transition-colors`}
          >
            Save Changes
          </button>
          <button
            onClick={deleteWorkspace}
            className={`w-full py-3 rounded-lg ${
              isDarkMode
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-red-500 text-white hover:bg-red-600"
            } transition-colors`}
          >
            Delete Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
