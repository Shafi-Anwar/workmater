"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkspaceDeletedPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect after a short delay (e.g., 2 seconds)
    setTimeout(() => {
      router.push("/dashboard"); // Redirect to the dashboard or any other page
    }, 2000);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <div className="w-16 h-16 mx-auto mb-4">
          <svg
            className="w-full h-full text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Workspace Deleted Successfully
        </h1>
      </div>
    </div>
  );
}
