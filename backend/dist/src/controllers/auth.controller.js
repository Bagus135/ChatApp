import prisma from '../db/prismaDB.js';
import bcryptjs from "bcryptjs";
import generateToken from '../utils/generateToken.js';
export const signUp = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
        if (!fullname || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "Please fill in all fields :)" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password dont match!!" });
        }
        const user = await prisma.user.findUnique({
            where: { username }
        });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const newUser = await prisma.user.create({
            data: {
                fullname,
                username,
                password: hashedPass,
                gender,
                profilePic: gender === "male" ? boyProfilePic : girlProfilePic
            }
        });
        if (newUser) {
            generateToken(newUser.id, res);
            res.status(201).json({
                id: newUser.id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }
        else {
            res.status(400).json({ error: "Invalid user data :{ " });
        }
    }
    catch (error) {
        console.log("Error in sign up controller", error.message);
        res.status(500).json({ error: "Internal Server Error :" });
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        const user = await prisma.user.findUnique({
            where: { username }
        });
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentals" });
        }
        ;
        const isPassCorrect = await bcryptjs.compare(password, user.password);
        if (!isPassCorrect) {
            return res.status(400).json({ error: "Your Password is not Correct" });
        }
        ;
        generateToken(user.id, res);
        res.status(200).json({
            id: user.id,
            fullname: user.fullname,
            username: user.username,
            profilPic: user.profilePic
        });
    }
    catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Succesfully" });
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getMe = async (req, res) => {
    try {
        res.status(200).json({
            id: req.user.id,
            username: req.user.username,
            fullname: req.user.fullname,
            profilPic: req.user.profilePic
        });
    }
    catch (err) {
        console.log("Error in getMe controller", err.message);
        res.status(500).json({ err: "Internal Server Error" });
    }
};
