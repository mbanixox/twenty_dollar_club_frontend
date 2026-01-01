import { Socket, Channel } from "phoenix";
import { User } from "../types";

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:4000/socket";

export class PaymentSocket {
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

  joinPaymentChannel(
    userEmail: string,
    onMembershipCreated: (payload: {
      token: string;
      user: User;
    }) => void,
    onError: (payload: { message: string }) => void
  ) {
    // Don't join if already in a channel
    if (this.channel) {
      console.log("Already in a payment channel");
      return this.channel;
    }

    this.channel = this.socket.channel(`payment:${userEmail}`, {});

    this.channel.on("membership_created", (payload) => {
      console.log("Membership created event received:", payload);
      onMembershipCreated(payload);
    });

    this.channel.on("error", (payload) => {
      console.error("Payment error event received:", payload);
      onError(payload);
    });

    this.channel
      .join()
      .receive("ok", (resp) => {
        console.log("Successfully joined payment channel", resp);
      })
      .receive("error", (resp) => {
        console.error("Failed to join payment channel", resp);
        onError({ message: "Failed to join payment channel" });
      })
      .receive("timeout", () => {
        console.error("Channel join timeout");
        onError({ message: "Connection timeout" });
      });

    return this.channel;
  }

  leaveChannel() {
    if (this.channel) {
      this.channel.leave();
      this.channel = null;
    }
  }
}