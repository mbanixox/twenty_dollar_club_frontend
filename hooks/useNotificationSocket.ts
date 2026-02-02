import { toast } from "sonner";
import { Notification } from "@/lib/types";
import { useEffect, useState, useRef } from "react";
import { getNotificationSocket } from "@/lib/socket/notification_socket";

interface UseNotificationSocketOptions {
  membershipId: string | null;
  enabled?: boolean;
  onNewNotification?: (notification: Notification) => void;
}

let callbackIdCounter = 0;

export const useNotificationSocket = ({
  membershipId,
  enabled = true,
  onNewNotification,
}: UseNotificationSocketOptions) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const callbackIdRef = useRef<string | null>(null);

  // Initialize callback ID once
  if (callbackIdRef.current === null) {
    callbackIdRef.current = `callback-${++callbackIdCounter}-${Date.now()}`;
  }

  useEffect(() => {
    if (!membershipId || !enabled) return;

    const socket = getNotificationSocket();
    socket.connect();

    const channel = socket.joinNotificationChannel(
      membershipId,
      callbackIdRef.current!,
      {
        onUnreadCount: (payload) => setUnreadCount(payload.count),
        onNewNotification: (payload) => {
          toast("New notification", { description: payload.message });

          if (onNewNotification) onNewNotification(payload);
        },
        onError: () => setIsConnected(false),
      },
    );

    // Only call join() if the channel is not already joined
    if (channel) {
      if (channel.state === "joined") {
        setIsConnected(true);
        socket.requestUnreadCount();
      } else if (channel.state === "closed" || channel.state === "errored") {
        channel
          .join()
          .receive("ok", () => {
            setIsConnected(true);
            socket.requestUnreadCount();
          })
          .receive("error", () => setIsConnected(false))
          .receive("timeout", () => setIsConnected(false));
      }
    }

    return () => {
      setIsConnected(false);
      socket.leaveChannel(callbackIdRef.current!);
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
