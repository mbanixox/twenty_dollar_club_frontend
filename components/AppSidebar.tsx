import { Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import SidebarMenuWrapper from "./SidebarMenuWrapper";

export async function AppSidebar() {
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
        <div className="px-4 py-3 flex items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
            <Users className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-xs group-data-[collapsible=icon]:hidden">
            <span className="font-medium">User Name</span>
            <span className="text-muted-foreground">user@example.com</span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
