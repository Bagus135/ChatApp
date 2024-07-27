import jwt, {JwtPayload}from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import prisma from '../db/prismaDB.js';

interface DecodedToken extends JwtPayload {
    userID : string
}

declare global{
    namespace Express {
        export interface Request {
            user :{
                id : string;
                username : string,
                fullname: string;
                profilePic: string;
            }
        }
    }
}

const protectRoute = async (req : Request, res : Response, next : NextFunction) =>{
    try {
        const token = req.cookies.jwt;
        console.log(req.cookies.jwt)
        if(!token){
            return res.status(401).json({error : "Unauthorized - No token provided"});
        };

        const decoded = jwt.verify(token, process.env.JWT_Secret!) as DecodedToken
        
        if(!decoded){
            return res.status(401).json({error : "Unauthorized - Invalid Token"})
        }

        const user = await prisma.user.findUnique({where : {id : decoded.userID}, select:{id : true, username:true, fullname:true ,profilePic: true}});

        if(!user){
            return res.status(404).json({error : "User Not Found"})
        }
        
        req.user = user
        
        next()

    } catch (error:any) {
        console.log("Error in protect Routes", error.message);
        res.status(500).json({error : "Internal Server Error"})
    }
}

export default protectRoute