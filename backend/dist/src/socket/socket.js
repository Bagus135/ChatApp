import { Server } from "socket.io";
import http from "http";
import express from 'express';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});
export const getReceiverSocketID = (receiverID) => {
    return userSocketMap[receiverID];
};
const userSocketMap = {};
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userID;
    if (userId)
        userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});
export { io, app, server };
