"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Chart from "chart.js/auto"; // Install Chart.js for charts
import { Line } from "react-chartjs-2"; // Install react-chartjs-2 for React components

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState([]);

  // Dummy data for widgets
  const [revenue, setRevenue] = useState(150000); // Example revenue
  const [newUsers, setNewUsers] = useState(250); // Example new users
  const [monthlyGrowth, setMonthlyGrowth] = useState(12); // Example monthly growth percentage

  // Dummy data for charts
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        data: [40000, 50000, 60000, 70000, 80000, 90000],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
      fetchWorkspaces();
    } else if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status]);

  const fetchWorkspaces = async () => {
    try {
      const response = await fetch("/api/workspaces");
      if (!response.ok) {
        throw new Error("Failed to fetch workspaces");
      }
      const data = await response.json();
      setWorkspaces(data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-500 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-6xl relative overflow-hidden">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Welcome, {session?.user?.name}
        </h1>

        {/* Summary Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Revenue Widget */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Total Revenue</h2>
            <p className="text-3xl font-semibold">
              ${revenue.toLocaleString()}
            </p>
          </div>

          {/* New Users Widget */}
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">New Users</h2>
            <p className="text-3xl font-semibold">{newUsers}</p>
          </div>

          {/* Monthly Growth Widget */}
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Monthly Growth</h2>
            <p className="text-3xl font-semibold">{monthlyGrowth}%</p>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Revenue Trends</h2>
          <div className="h-60">
            <Line data={chartData} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Workspace "Design System" created.</li>
            <li>Revenue of $5,000 recorded on July 15th.</li>
            <li>New user "Jane Doe" registered.</li>
            <li>Monthly growth of 12% reported.</li>
          </ul>
        </div>

        {/* Workspaces Section */}
        <div className="bg-white shadow-md rounded-xl p-10 w-full max-w-4xl relative overflow-hidden">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Your Workspaces
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {workspaces.map((workspace) => (
              <div
                key={workspace._id}
                className="bg-white shadow-md rounded-xl p-6 w-60 transition-transform transform hover:scale-105 relative overflow-hidden"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {workspace.name}
                </h3>
                <a
                  href={`/workspaces/${workspace._id}`}
                  className="block text-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
          <button
            className="mt-10 bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
            onClick={() => router.push("/create-workspaces")}
          >
            Create New Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
