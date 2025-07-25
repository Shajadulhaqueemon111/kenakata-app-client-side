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

const items = [
  { title: "Home", url: "/user", icon: Home },
  {
    title: "Fruits & Vegitables",
    url: "/user/allfruitesandvegetables",
    icon: Inbox,
  },
  { title: "Fresh-Fruites", url: "/user/freshfruites", icon: Grape },
  { title: "Fresh-Vegetables", url: "/user/freshvegetables", icon: Carrot },
  { title: "Fish & Meats", url: "/user/allmeatandfish", icon: Fish },
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
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="mt-10">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="flex items-center gap-2">
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
