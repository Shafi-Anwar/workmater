// app/profile/page.js
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-red-500">
          You are not signed in. Please sign in to view this page.
        </p>
        <Link href="/api/auth/signin">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors">
            Sign In
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}</h1>
      <p className="text-lg text-gray-700 mb-4">Email: {session.user.email}</p>
      <Link href="/api/auth/signout">
        <button className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition-colors">
          Sign Out
        </button>
      </Link>
    </div>
  );
}
