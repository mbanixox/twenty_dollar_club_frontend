"use client";

import { Badge } from "@/components/ui/badge";
import { useNotificationSocket } from "@/hooks/useNotificationSocket";

const NotificationUnreadCount = ({
  membershipId,
}: {
  membershipId: string;
}) => {
  const { unreadCount } = useNotificationSocket({
    membershipId,
  });

  return (
    <>
      {unreadCount > 0 && (
        <Badge
          variant="secondary"
          className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {unreadCount}
        </Badge>
      )}
    </>
  );
};

export default NotificationUnreadCount;
