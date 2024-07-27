import jwt from 'jsonwebtoken';
import prisma from '../db/prismaDB.js';
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(req.cookies.jwt);
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }
        ;
        const decoded = jwt.verify(token, process.env.JWT_Secret);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        const user = await prisma.user.findUnique({ where: { id: decoded.userID }, select: { id: true, username: true, fullname: true, profilePic: true } });
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error in protect Routes", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export default protectRoute;
