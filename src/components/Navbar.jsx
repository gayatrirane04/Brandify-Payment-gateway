"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Brand Logo */}
      <div className="text-2xl font-bold text-blue-400">
        <Link href="/">Brandify</Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6">
        <Link href="/" className="hover:text-blue-300">Home</Link>
        <Link href="/plans" className="hover:text-blue-300">Plans</Link>
      </div>

      {/* User Section */}
      <div>
        <Link 
          href="/login" 
          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Login
        </Link>
      </div>
    </nav>
  );
}
