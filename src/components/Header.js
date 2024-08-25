"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to homepage after signing out
  };

  return (
    <nav className="max-w-5xl mx-auto px-4 w-full">
      <div className="flex items-center gap-8 justify-between py-4">
        <Link
          href="/"
          className="text-2xl font-semibold text-black hover:opacity-90"
        >
          WorkMater
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
            <div className="relative">
              {/* User Button */}
              <button
                onClick={handleMenuToggle}
                className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:opacity-80"
              >
                {session.user.name.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
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
