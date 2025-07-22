"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // 🛑 Prevent hydration misma
  return (
    <nav className="bg-white shadow-md px-4 py-3 w-full fixed top-0 left-0 z-50 ">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-primary text-linear-to-bl from-violet-500 to-fuchsia-500">
          <h1 className="text-xl font-bold text-red-600">
            Kena<span className="text-green-600 text-xl">kata</span>
          </h1>
        </div>

        <div className="hidden md:flex flex-1 mx-6 max-w-xl">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-3 space-y-2 px-4">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // ✅ fixed
          />
          <Link href="/login">
            <Button variant="default" className="w-full">
              Login
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
