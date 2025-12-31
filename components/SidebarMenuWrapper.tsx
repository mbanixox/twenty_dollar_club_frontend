"use client";

import { DollarSign, Folder, Heart, Users } from "lucide-react";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const items = [
  {
    title: "Members",
    url: "/dashboard/members",
    icon: Users,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: Folder,
  },
  {
    title: "Beneficiaries",
    url: "/dashboard/beneficiaries",
    icon: Heart,
  },
  {
    title: "Project Contributions",
    url: "/dashboard/project-contributions",
    icon: DollarSign,
  },
];

const SidebarMenuWrapper = () => {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = pathname === item.url;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
              <Link
                href={item.url}
                className={`
                      flex items-center gap-3 rounded-lg px-3 py-2.5 
                      transition-all duration-200 ease-in-out
                      ${
                        isActive
                          ? "bg-primary text-primary-foreground font-medium shadow-sm"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }
                    `}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default SidebarMenuWrapper;
