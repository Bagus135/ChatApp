import jwt from 'jsonwebtoken';
import { Response } from 'express';

const generateToken = (userID:string, res:Response) =>{
    const token = jwt.sign({userID},process.env.JWT_Secret!, {expiresIn : "15d"})
    res.cookie("jwt", token, {
        maxAge : 15 * 24 *60 * 60 * 1000, // ms
        httpOnly : true, // mencegah XSS cross site scripting,
        sameSite : "strict", // CSRF attack cross-site request forgery
        secure : process.env.NODE_ENV !== "development" // is HTTPS
    })
}

export default generateToken