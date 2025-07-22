import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebarContent } from "./sidebar/sidebar";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/navbar/navbar";
import Footer from "./footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <div className="flex h-screen font-sans antialiased">
        <Sidebar className="w-64">
          <AppSidebarContent />
        </Sidebar>

        <main className="flex-1 p-4">
          <SidebarTrigger className="text-black mt-10" />
          <Navbar />
          <div className="mt-4">{children}</div>
          <Footer />
        </main>
      </div>
    </SidebarProvider>
  );
}
