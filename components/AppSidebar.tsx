import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/auth/session";
import SidebarMenuWrapper from "@/components/SidebarMenuWrapper";

export async function AppSidebar() {
  const session = await getSession();
  const user = session?.user;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-3 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm shrink-0">
            $20
          </div>
          <span className="font-semibold text-base group-data-[collapsible=icon]:hidden">
            Twenty Dollar Club
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarMenuWrapper />
      </SidebarContent>

      <SidebarFooter className="border-t mt-auto">
        <Link
          href="/dashboard/profile"
          className="px-4 py-3 flex items-center gap-3 hover:bg-muted/50 rounded-lg transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2"
        >
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
            <Users className="h-4 w-4" />
          </div>
          {user && (
            <div className="flex flex-col gap-1 text-xs group-data-[collapsible=icon]:hidden">
              <span className="font-medium">
                {user.first_name} {user.last_name}
              </span>
              <span className="text-muted-foreground truncate">
                {user.email}
              </span>
              {user.membership && (
                <Badge
                  variant={
                    user.membership.role === "admin" ? "default" : "secondary"
                  }
                  className="w-fit text-xs"
                >
                  {user.membership.role}
                </Badge>
              )}
            </div>
          )}
        </Link>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
