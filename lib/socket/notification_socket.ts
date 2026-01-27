// lib/websocket/notificationSocket.ts
import { Socket, Channel } from "phoenix";
import { Notification } from "../types";

const WEBSOCKET_URL =
  process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:4000/socket";

export class NotificationSocket {
  private socket: Socket;
  private channel: Channel | null = null;

  constructor() {
    this.socket = new Socket(WEBSOCKET_URL, {
      params: {},
      reconnectAfterMs: (tries) => {
        if (tries > 4) return 10000;
        return [1000, 2000, 5000, 10000][tries - 1] || 10000;
      },
      logger: (kind, msg, data) => {
        console.log(`${kind}: ${msg}`, data);
      },
    });
  }

  connect() {
    if (this.socket.isConnected()) {
      console.log("Socket already connected");
      return;
    }
    this.socket.connect();
  }

  disconnect() {
    if (this.channel) {
      this.channel.leave();
      this.channel = null;
    }
    if (this.socket.isConnected()) {
      this.socket.disconnect();
    }
  }

  isConnected() {
    return this.socket.isConnected();
  }

  joinNotificationChannel(
    membershipId: string,
    callbacks: {
      onUnreadCount?: (payload: { count: number }) => void;
      onNewNotification?: (payload: Notification) => void;
      onError?: (payload: { message: string }) => void;
    },
  ) {
    // Don't join if already in a channel
    if (this.channel) {
      console.log("Already in a notification channel");
      return this.channel;
    }

    this.channel = this.socket.channel(`notifications:${membershipId}`, {});

    // Listen for unread count updates
    if (callbacks.onUnreadCount) {
      this.channel.on("unread_count", (payload: { count: number }) => {
        console.log("Unread count received:", payload);
        callbacks.onUnreadCount!(payload);
      });
    }

    // Listen for new notifications
    if (callbacks.onNewNotification) {
      this.channel.on("new_notification", (payload) => {
        console.log("New notification received:", payload);
        callbacks.onNewNotification!(payload);
      });
    }

    // Error handling
    if (callbacks.onError) {
      this.channel.on("error", (payload) => {
        console.error("Notification error event received:", payload);
        callbacks.onError!(payload);
      });
    }

    // Return the channel so the caller can handle join
    return this.channel;
  }

  leaveChannel() {
    if (this.channel) {
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
