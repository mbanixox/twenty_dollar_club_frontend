import {
  DollarSign,
  Folder,
  Heart,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
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

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="px-4 py-2 font-bold">Twenty Dollar Club</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-sm">User Info</div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
