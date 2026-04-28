import { io, Socket } from "socket.io-client";
import { store } from "./redux/store";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      const token = store.getState().auth.accessToken;
      
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
        autoConnect: true,
        auth: { token }
      });

      this.socket.on("connect", () => {
        console.log("Connected to socket server", this.socket?.id);
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });
    }
    return this.socket;
  }

  // Allow updating the token without a full reconnect if possible, 
  // or just disconnect and reconnect when user logs in.
  reconnectWithToken(token: string) {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
      auth: { token }
    });
    return this.socket;
  }

  getSocket() {
    return this.socket || this.connect();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
