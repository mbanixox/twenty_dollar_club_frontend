
import { isAdmin } from "@/lib/auth/session";
import NotificationsWrapper from "@/components/notifications/NotificationsWrapper";

const Page = async () => {
  const isAdminUser = await isAdmin();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2 px-6">Notifications</h1>
      <p className="text-muted-foreground mb-6 px-6">
        Stay updated with your latest notifications
      </p>

      <NotificationsWrapper isAdmin={isAdminUser} />
    </div>
  );
};

export default Page;
