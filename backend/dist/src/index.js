import express from "express";
import authRoutes from "./route/auth.route.js";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import messageRoutes from "./route/message.route.js";
import { app, server } from "./socket/socket.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
// middleware
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
