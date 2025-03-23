import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:4000";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"], // Ensure WebSocket transport only
  withCredentials: true,
  reconnection: true, // Enable automatic reconnection
  reconnectionAttempts: 10, // Increase reconnection attempts
  reconnectionDelay: 5000, // Increase delay for better stability
});

