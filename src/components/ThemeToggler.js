// src/components/ThemeToggler.js
"use client";
import { useEffect } from "react";
import { useTheme } from "@/components/ThemeContext";

export default function ThemeToggler() {
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md ${
        isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
