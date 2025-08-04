"use client";

import Link from "next/link";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Carrot,
  Contact,
  CookingPot,
  Fish,
  Grape,
  Home,
  Inbox,
  LucideBrushCleaning,
} from "lucide-react";
import { FcFeedback } from "react-icons/fc";
import React, { useState } from "react";

type MenuItem = {
  title: string;
  url?: string;
  icon: React.ElementType;
  children?: MenuItem[];
};

const items: MenuItem[] = [
  { title: "Home", url: "/user", icon: Home },
  {
    title: "Fruits & Vegitables",
    url: "/user/allfruitesandvegetables",
    icon: Inbox,
  },
  {
    title: "Fresh Products",
    icon: Grape,
    children: [
      {
        title: "Fresh Fruits",
        url: "/user/freshfruites",
        icon: Grape,
      },
      {
        title: "Fresh Vegetables",
        url: "/user/freshvegetables",
        icon: Carrot,
      },
    ],
  },
  {
    title: "Fish & Meats",
    url: "/user/allmeatandfish",
    icon: Fish,
  },
  {
    title: "Cooking Essentials",
    url: "/user/CookingEssentials",
    icon: CookingPot,
  },
  {
    title: "Cleaning Product",
    url: "/user/CleaningProduct",
    icon: LucideBrushCleaning,
  },
  {
    title: "Contact",
    url: "/user/contact",
    icon: Contact,
  },
  {
    title: "Feed Back",
    url: "/user/feedback",
    icon: FcFeedback,
  },
];

export function AppSidebarContent() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="mt-10">
            {items.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <>
                    <SidebarMenuItem>
                      <button
                        onClick={() => toggleDropdown(item.title)}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded transition"
                      >
                        {React.createElement(item.icon, {
                          className: "w-5 h-5",
                        })}
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuItem>

                    {openDropdown === item.title &&
                      item.children.map((child) => (
                        <SidebarMenuItem key={child.title} className="ml-6">
                          <SidebarMenuButton asChild>
                            <Link
                              href={child.url!}
                              className="flex items-center gap-2 text-sm text-gray-700 hover:text-amber-500"
                            >
                              {React.createElement(child.icon, {
                                className: "w-4 h-4",
                              })}
                              <span>{child.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </>
                ) : (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url!}
                        className="flex items-center gap-2"
                      >
                        {React.createElement(item.icon, {
                          className: "w-5 h-5",
                        })}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </div>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
