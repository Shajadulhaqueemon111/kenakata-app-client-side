// src/app/dashboard/layout.tsx
"use client";

import { SidebarProvider } from "@/components/ui/sidebar"; // ✅ import provider
import { AppSidebar } from "@/components/app-sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {" "}
      <div className="flex ">
        <AppSidebar />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
