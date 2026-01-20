import { Socket, Channel } from "phoenix";

const WEBSOCKET_URL =
  process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:4000/socket";

export class ReportSocket {
  private socket: Socket;
  private channel: Channel | null = null;
  private connectionPromise: Promise<void> | null = null;

  constructor() {
    this.socket = new Socket(WEBSOCKET_URL, {
      params: {},
      reconnectAfterMs: (tries) => {
        return [100, 500, 1000, 2000, 5000][tries - 1] || 5000;
      },
      timeout: 5000,
      logger: (kind, msg, data) => {
        console.log(`${kind}: ${msg}`, data);
      },
    });
  }

  connect(): Promise<void> {
    if (this.socket.isConnected()) {
      console.log("Socket already connected");
      return Promise.resolve();
    }

    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve) => {
      this.socket.connect();

      const checkConnection = setInterval(() => {
        if (this.socket.isConnected()) {
          clearInterval(checkConnection);
          this.connectionPromise = null;
          resolve();
        }
      }, 50);

      setTimeout(() => {
        clearInterval(checkConnection);
        this.connectionPromise = null;
        resolve();
      }, 3000);
    });

    return this.connectionPromise;
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

  async joinReportChannel(
    membershipId: string,
    callbacks: {
      onReportReady?: (payload: {
        report_type: string;
        filename: string;
        download_url: string;
      }) => void;
      onError?: (payload: { message: string }) => void;
    }
  ): Promise<Channel | null> {
    // Ensure socket is connected before joining
    await this.connect();

    if (this.channel) {
      console.log("Already in a report channel");
      return this.channel;
    }

    this.channel = this.socket.channel(`report:${membershipId}`, {
      timeout: 5000,
    });

    if (callbacks.onReportReady) {
      this.channel.on("report_ready", (payload) => {
        console.log("Report ready event received:", payload);
        callbacks.onReportReady!(payload);
      });
    }

    if (callbacks.onError) {
      this.channel.on("error", (payload) => {
        console.error("Report error event received:", payload);
        callbacks.onError!(payload);
      });
    }

    this.channel
      .join()
      .receive("ok", (resp) => {
        console.log("Successfully joined report channel", resp);
      })
      .receive("error", (resp) => {
        console.error("Failed to join report channel", resp);
        if (callbacks.onError) {
          callbacks.onError({ message: "Failed to join report channel" });
        }
      })
      .receive("timeout", () => {
        console.error("Channel join timeout");
        if (callbacks.onError) {
          callbacks.onError({ message: "Connection timeout" });
        }
      });

    return this.channel;
  }

  generateReport(reportType: string): Promise<{ status: string }> {
    return new Promise((resolve, reject) => {
      if (!this.channel) {
        reject(new Error("Not connected to report channel"));
        return;
      }

      this.channel
        .push("generate_report", { report_type: reportType }, 5000)
        .receive("ok", (response) => {
          console.log("Report generation started:", response);
          resolve(response);
        })
        .receive("error", (error) => {
          console.error("Report generation failed:", error);
          reject(error);
        })
        .receive("timeout", () => {
          console.error("Report generation timeout");
          reject(new Error("Request timeout"));
        });
    });
  }

  leaveChannel() {
    if (this.channel) {
      this.channel.leave();
      this.channel = null;
    }
  }
}
