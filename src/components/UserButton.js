"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const UserButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <button className="text-gray-500">Loading...</button>;
  }

  if (!session) {
    return (
      <Link
        href="/api/auth/signin"
        className="text-sm font-medium text-white bg-blue-500 px-4 py-2 rounded-lg hover:opacity-90"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="relative">
      <button className="text-sm font-medium text-white bg-gray-700 px-4 py-2 rounded-lg hover:opacity-90">
        {session.user.name}
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
        <Link
          href="/profile"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Profile
        </Link>
        <button
          onClick={() => signOut()}
          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserButton;
