// components/Header.js
"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <nav className="max-w-5xl mx-auto px-4 w-full">
      <div className="flex items-center gap-8 justify-between py-4">
        <Link
          href="/"
          className="text-2xl font-semibold text-black hover:opacity-90"
        >
          Logo
        </Link>

        <div className="flex gap-4 items-center">
          <Link
            href="/#features"
            className="text-sm font-medium text-black hover:opacity-90"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium text-black hover:opacity-90"
          >
            Pricing
          </Link>
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-white bg-black px-4 py-2 rounded-lg hover:opacity-90"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="text-sm font-medium text-blue-500 hover:underline"
              >
                {session.user.name}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/api/auth/signin"
                className="text-sm font-medium text-white bg-blue-500 px-4 py-2 rounded-lg hover:opacity-90"
              >
                Sign In
              </Link>
              <Link
                href="/api/auth/signup"
                className="text-sm font-medium text-white bg-green-500 px-4 py-2 rounded-lg hover:opacity-90"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
