import { toast } from "sonner";
import { Notification } from "@/lib/types";
import { useEffect, useState } from "react";
import { getNotificationSocket } from "@/lib/socket/notification_socket";

interface UseNotificationSocketOptions {
  membershipId: string | null;
  enabled?: boolean;
  onNewNotification?: (notification: Notification) => void;
}

export const useNotificationSocket = ({
  membershipId,
  enabled = true,
  onNewNotification,
}: UseNotificationSocketOptions) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!membershipId || !enabled) return;

    const socket = getNotificationSocket();
    socket.connect();

    const channel = socket.joinNotificationChannel(membershipId, {
      onUnreadCount: (payload) => setUnreadCount(payload.count),
      onNewNotification: (payload) => {
        toast("New notification", { description: payload.message });
        setUnreadCount((prev) => prev + 1);
        if (onNewNotification) onNewNotification(payload);
      },
      onError: () => setIsConnected(false),
    });

    // Only call join() if the channel is not already joined
    if (channel && (!channel.state || channel.state === "closed")) {
      channel
        .join()
        .receive("ok", () => {
          setIsConnected(true);
          socket.requestUnreadCount();
        })
        .receive("error", () => setIsConnected(false))
        .receive("timeout", () => setIsConnected(false));
    }

    return () => {
      setIsConnected(false);
      socket.leaveChannel();
      socket.disconnect();
    };
  }, [membershipId, enabled, onNewNotification]);

  const refreshUnreadCount = () => {
    if (isConnected) {
      const socket = getNotificationSocket();
      socket.requestUnreadCount();
    }
  };

  return {
    unreadCount,
    isConnected,
    refreshUnreadCount,
  };
};