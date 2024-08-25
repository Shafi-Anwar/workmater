"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkspaceDetails({ params }) {
  const { id } = params;
  const router = useRouter();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const response = await fetch(`/api/workspaces/${id}`);
        if (!response.ok) throw new Error("Workspace not found");
        const data = await response.json();
        setWorkspace(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching workspace details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center min-h-screen flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="workspace-details max-w-md w-full p-6 bg-white rounded-lg shadow-lg relative overflow-hidden transform transition-transform hover:scale-105">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Workspace: {workspace.name}
        </h1>
        <p className="text-gray-600 mb-2">
          <strong>Description:</strong> {workspace.description || "Not Set"}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Automation Enabled:</strong>{" "}
          {workspace.automationEnabled ? "Yes" : "No"}
        </p>
        {workspace.automationEnabled && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Automations</h2>
            {Object.keys(workspace.automationOptions).length > 0 ? (
              Object.keys(workspace.automationOptions).map((key) => (
                <p key={key} className="text-gray-600 mb-2">
                  <strong>
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                  </strong>{" "}
                  {workspace.automationOptions[key] ? "Enabled" : "Disabled"}
                </p>
              ))
            ) : (
              <p>No automations set up.</p>
            )}
          </div>
        )}
        <div className="space-y-4">
          <a
            href={`/workspaces/${workspace._id}/settings`}
            className="w-full p-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 text-center block transition-colors"
          >
            Workspace Settings
          </a>
        </div>
        <style jsx>{`
          .workspace-details::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(
              circle,
              rgba(0, 0, 0, 0.2) 20%,
              transparent 60%
            );
            pointer-events: none;
            transition: opacity 0.3s ease;
            opacity: 0;
          }

          .workspace-details:hover::before {
            opacity: 1;
          }

          .loader {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top: 4px solid #000;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
