import express, {Response, Request } from "express";
import { logout, signUp, getMe, login} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoutes.js";

const authRoutes = express.Router();
authRoutes.get("/me", protectRoute, getMe)
authRoutes.post("/signup", signUp)
authRoutes.post("/logout", logout)
authRoutes.post("/login", login)

export default authRoutes