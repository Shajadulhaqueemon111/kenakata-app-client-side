"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useAuth } from "@/app/authcontext/context";
import { useRouter } from "next/navigation";
import { useSearch } from "@/context/SearchContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const { query, setQuery } = useSearch();
  const { data: session, status } = useSession();
  const { user: customUser, logout: customLogOut } = useAuth();
  console.log("customUser:", customUser);
  console.log("customUser?.profileImage:", customUser?.profileImage);
  const router = useRouter();
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const isLoggedIn = !!session || !!customUser;
  const displayName =
    session?.user?.name || session?.user?.email || customUser?.email;
  const displayImage = session?.user?.image || customUser?.profileImage;

  const handleLogout = () => {
    if (session) {
      signOut({ redirect: true, callbackUrl: "/login" });
    } else if (customUser) {
      customLogOut();
      router.push("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 w-full fixed top-0 left-0 z-50">
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {status === "loading" ? null : isLoggedIn ? (
            <>
              <span className="text-gray-700">Hi, {displayName}</span>
              <span className="inline-block rounded-full overflow-hidden w-8 h-8">
                {displayImage ? (
                  <Image
                    src={displayImage}
                    alt="User avatar"
                    width={34}
                    height={34}
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="bg-gray-300 w-8 h-8 rounded-full" />
                )}
              </span>
              <Button variant="default" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="default">Login</Button>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden sm:hidden mt-3 space-y-4 px-4">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {status === "loading" ? null : isLoggedIn ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-gray-700 text-sm">{displayName}</span>
                <span className="inline-block rounded-full overflow-hidden w-8 h-8">
                  {displayImage ? (
                    <Image
                      src={displayImage}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-gray-300 w-8 h-8 rounded-full" />
                  )}
                </span>
              </div>
              <Button
                variant="default"
                className="w-full"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="default" className="w-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
