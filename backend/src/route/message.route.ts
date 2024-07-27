import express from "express";
import protectRoute from "../middleware/protectRoutes.js";
import { getMessage,getSideBar, sendMessage} from "../controllers/message.controller.js";

const messageRoutes = express.Router();

messageRoutes.post("/send/:id", protectRoute, sendMessage);
messageRoutes.get("/get/:id", protectRoute, getMessage);
messageRoutes.get("/conversations", protectRoute, getSideBar);

export default messageRoutes