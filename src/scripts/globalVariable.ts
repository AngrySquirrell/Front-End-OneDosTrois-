import { io } from "socket.io-client";

export const pocketBaseUrl: string = `https://louisrvl.fr/pocketbase`;
export const socket = io("http://localhost:3000");
