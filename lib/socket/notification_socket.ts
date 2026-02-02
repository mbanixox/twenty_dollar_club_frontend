import { Socket, Channel } from "phoenix";
import { Notification } from "@/lib/types";

const WEBSOCKET_URL =
  process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:4000/socket";

export class NotificationSocket {
  private socket: Socket;
  private channel: Channel | null = null;
  private connectionCount: number = 0;
  private channelCallbacks: Map<
    string,
    {
      onUnreadCount?: (payload: { count: number }) => void;
      onNewNotification?: (payload: Notification) => void;
      onError?: (payload: { message: string }) => void;
    }
  > = new Map();

  constructor() {
    this.socket = new Socket(WEBSOCKET_URL, {
      params: {},
      reconnectAfterMs: (tries) => {
        if (tries > 4) return 10000;
        return [1000, 2000, 5000, 10000][tries - 1] || 10000;
      },
    });

    this.socket.onError(() => {
      console.error("Socket connection error");
    });

    this.socket.onClose(() => {
      console.log("Socket connection closed");
    });
  }

  connect() {
    this.connectionCount++;

    if (this.socket.isConnected()) {
      return;
    }

    this.socket.connect();
  }

  disconnect() {
    this.connectionCount--;

    // Only actually disconnect if no one is using the socket
    if (this.connectionCount <= 0) {
      this.connectionCount = 0;

      if (this.channel) {
        this.channel.leave();
        this.channel = null;
        this.channelCallbacks.clear();
      }

      if (this.socket.isConnected()) {
        this.socket.disconnect();
      }
    }
  }

  isConnected() {
    return this.socket.isConnected();
  }

  joinNotificationChannel(
    membershipId: string,
    callbackId: string,
    callbacks: {
      onUnreadCount?: (payload: { count: number }) => void;
      onNewNotification?: (payload: Notification) => void;
      onError?: (payload: { message: string }) => void;
    },
  ) {
    // Store callbacks for this subscriber
    this.channelCallbacks.set(callbackId, callbacks);

    // If channel already exists, just return it
    if (this.channel) {
      return this.channel;
    }

    // Create new channel
    this.channel = this.socket.channel(`notifications:${membershipId}`, {});

    // Listen for unread count updates - broadcast to all subscribers
    this.channel.on("unread_count", (payload: { count: number }) => {
      this.channelCallbacks.forEach((cb) => {
        if (cb.onUnreadCount) {
          cb.onUnreadCount(payload);
        }
      });
    });

    // Listen for new notifications - broadcast to all subscribers
    this.channel.on("new_notification", (payload) => {
      this.channelCallbacks.forEach((cb) => {
        if (cb.onNewNotification) {
          cb.onNewNotification(payload);
        }
      });
    });

    // Error handling - broadcast to all subscribers
    this.channel.on("error", (payload) => {
      console.error("Notification error event received:", payload);
      this.channelCallbacks.forEach((cb) => {
        if (cb.onError) {
          cb.onError(payload);
        }
      });
    });

    return this.channel;
  }

  leaveChannel(callbackId: string) {
    // Remove this subscriber's callbacks
    this.channelCallbacks.delete(callbackId);

    // Only leave the channel if no one else is subscribed
    if (this.channelCallbacks.size === 0 && this.channel) {
      this.channel.leave();
      this.channel = null;
    }
  }

  // Helper method to request current unread count
  requestUnreadCount() {
    if (this.channel) {
      this.channel.push("get_unread_count", {});
    }
  }
}

// Singleton instance
let notificationSocket: NotificationSocket | null = null;

export const getNotificationSocket = () => {
  if (!notificationSocket) {
    notificationSocket = new NotificationSocket();
  }
  return notificationSocket;
};
