"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateWorkspacePage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !session?.user?.email) {
      setError("Name and userId (email) are required");
      return;
    }

    try {
      const response = await fetch("/api/workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, userId: session.user.email }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setName("");
        setError("");
        setTimeout(() => {
          router.push("/dashboard"); // Redirect to the dashboard after 2 seconds
        }, 2000);
      } else {
        setError(result.error || "An error occurred");
      }
    } catch (error) {
      console.error("Failed to create workspace:", error);
      setError("An error occurred while creating the workspace.");
    }
  };

  return (
    <>
      {!success ? (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Create a Workspace</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Workspace Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Workspace
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      ) : (
        <div className="fixed inset-0 bg-white flex justify-center items-center">
          <div className="text-center">
            <svg
              className="w-24 h-24 text-green-500 mx-auto animate-checkmark"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-black mt-4 text-2xl">Workspace Created!</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes checkmark {
          0% {
            stroke-dashoffset: 50px;
            opacity: 0;
          }
          50% {
            stroke-dashoffset: 0;
            opacity: 0.5;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        .animate-checkmark {
          stroke-dasharray: 50px;
          animation: checkmark 1s ease-in-out forwards;
        }
      `}</style>
    </>
  );
}
