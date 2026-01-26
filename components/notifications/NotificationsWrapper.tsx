import { Bell, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPendingUsers } from "@/lib/users/actions";
import AdminNotifications from "@/components/notifications/AdminNotifications";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralNotifications from "@/components/notifications/GeneralNotifications";

const NotificationsWrapper = async ({ isAdmin }: { isAdmin: boolean }) => {
  const pendingUserData = await getPendingUsers();
  const pendingUsers = pendingUserData.data;

  const pendingUsersCount = pendingUsers.length;

  return (
    <div className="container mx-auto py-8">
      <div className="px-6">
        <Tabs defaultValue={isAdmin ? "admin" : "general"} className="w-full">
          <TabsList
            className="grid w-full max-w-md"
            style={{ gridTemplateColumns: isAdmin ? "1fr 1fr" : "1fr" }}
          >
            <TabsTrigger value="general" className="gap-2">
              <Bell className="w-4 h-4" />
              General
              {/* {unreadCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {unreadCount}
                </Badge>
              )} */}
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="admin" className="gap-2">
                <Crown className="w-4 h-4" />
                Admin
                {pendingUsersCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {pendingUsersCount}
                  </Badge>
                )}
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <GeneralNotifications />
          </TabsContent>

          {isAdmin && (
            <TabsContent value="admin" className="mt-6">
              <AdminNotifications pendingUsers={pendingUsers} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default NotificationsWrapper;
