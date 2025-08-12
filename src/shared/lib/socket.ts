import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_API_URL;

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export default socket;
