"use client";

import { useAuth } from "@/app/authcontext/context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function SiteHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <header className="w-full bg-white shadow-sm border-b h-16 fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6 bg-gray-300" />
          <h1 className="text-lg font-semibold text-gray-800">Welcome Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm text-gray-700 hidden sm:inline">
                Hello, <span className="font-medium">{user.email}</span>
              </span>
              <Button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
