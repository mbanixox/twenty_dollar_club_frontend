"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { useNotificationSocket } from "@/hooks/useNotificationSocket";

interface SecondarySidebarMenuProps {
  membershipId: string | null;
}

const SecondarySidebarMenu = ({ membershipId }: SecondarySidebarMenuProps) => {
  const pathname = usePathname();
  const { unreadCount } = useNotificationSocket({ membershipId });

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
            <div className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            <span className="text-sm flex-1">Notifications</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SecondarySidebarMenu;
