"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconCreativeCommons,
  IconDashboard,
  IconFolder,
  IconInnerShadowTop,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Total-User",
      url: "/dashboard/totalusers",
      icon: IconUsers,
    },
    {
      title: "Product list",
      url: "/dashboard/productlist",
      icon: IconChartBar,
    },
    {
      title: "View all orders",
      url: "/dashboard/viewallorders",
      icon: IconFolder,
    },
    {
      title: "create-offer-product",
      url: "/dashboard/createofferprice",
      icon: IconFolder,
    },
    {
      title: "offer-product-list",
      url: "/dashboard/offerproductlist",
      icon: IconCreativeCommons,
    },

    // {
    //   title: "Download invoice",
    //   url: "/invoice/dashboard",
    //   icon: IconListDetails,
    // },
    {
      title: "Create Product",
      url: "/dashboard/createproduct",
      icon: IconCamera,
    },
  ],
  // navClouds: [
  //   {
  //     title: "Capture",
  //     icon: IconCamera,
  //     isActive: true,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   // {
  //   //   title: "Proposal",
  //   //   icon: IconFileDescription,
  //   //   url: "#",
  //   //   items: [
  //   //     {
  //   //       title: "Active Proposals",
  //   //       url: "#",
  //   //     },
  //   //     {
  //   //       title: "Archived",
  //   //       url: "#",
  //   //     },
  //   //   ],
  //   // },
  //   // {
  //   //   title: "Prompts",
  //   //   icon: IconFileAi,
  //   //   url: "#",
  //   //   items: [
  //   //     {
  //   //       title: "Active Proposals",
  //   //       url: "#",
  //   //     },
  //   //     {
  //   //       title: "Archived",
  //   //       url: "#",
  //   //     },
  //   //   ],
  //   // },
  // ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: IconSettings,
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: IconHelp,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: IconSearch,
  //   },
  // ],
  // documents: [
  //   {
  //     name: "Data Library",
  //     url: "#",
  //     icon: IconDatabase,
  //   },
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: IconReport,
  //   },
  //   {
  //     name: "Word Assistant",
  //     url: "#",
  //     icon: IconFileWord,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold mt-4">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
