/* eslint-disable react-hooks/exhaustive-deps */
// import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// import { DataTable } from "@/components/data-table";
// import { SectionCards } from "@/components/section-cards";
// import { SiteHeader } from "@/components/site-header";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// import data from "./data.json";

// export default function Page() {
//   return (
//     <SidebarProvider
//       style={
//         {
//           "--sidebar-width": "calc(var(--spacing) * 72)",
//           "--header-height": "calc(var(--spacing) * 12)",
//         } as React.CSSProperties
//       }
//     >
//       <SidebarInset>
//         <SiteHeader />
//         <div className="flex flex-1 flex-col">
//           <div className="@container/main flex flex-1 flex-col gap-2">
//             <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//               <SectionCards />
//               <div className="px-4 lg:px-6">
//                 <ChartAreaInteractive />
//               </div>
//               <DataTable data={data} />
//             </div>
//           </div>
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }
// ✅ FIXED src/app/dashboard/page.tsx

// src/app/dashboard/page.tsx
"use client";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "../authcontext/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user, authLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoaded && (!user || user.role !== "admin")) {
      router.push("/login");
      router.refresh();
    }
  }, [authLoaded, user]);

  if (!authLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}

      <AppSidebar />
      {/* Main content */}
      <main className="flex-1 flex flex-col gap-4 p-4 md:p-6 lg:p-8">
        <SectionCards />
        <ChartAreaInteractive />
        <DataTable data={data} />
      </main>
    </div>
  );
}
