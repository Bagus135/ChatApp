import express from "express";
import authRoutes from "./route/auth.route.js"
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import messageRoutes from "./route/message.route.js";
import { app, server } from "./socket/socket.js";
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5000

const __dirname = path.resolve();

// middleware
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

if(process.env.NODE_ENV !== 'development'){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname,"frontend", "dist", "index.html"))
    })
}

server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});