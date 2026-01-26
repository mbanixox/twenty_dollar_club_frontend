"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Bell } from "lucide-react";

const AdminSidebarMenu = () => {
  const pathname = usePathname();
  const isActive = (url: string, currentPath: string) => {
    return url === currentPath;
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={isActive("/dashboard/notifications", pathname)}
          tooltip="Notifications"
        >
          <Link
            href="/dashboard/notifications"
            className={`
                      flex items-center gap-3 rounded-lg px-3 py-2.5 
                      transition-all duration-200 ease-in-out
                      ${
                        isActive("/dashboard/notifications", pathname)
                          ? "bg-primary text-primary-foreground font-medium shadow-sm"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }
                    `}
          >
            <Bell className="h-5 w-5" />
            <span className="text-sm">Notifications</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AdminSidebarMenu;
