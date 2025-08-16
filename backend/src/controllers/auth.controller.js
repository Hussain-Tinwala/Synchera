import User from "../models/User.model.js";
import jwt from "jsonwebtoken"
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "All fields are required" })

        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be atleast 8 characters long" })


        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })

        }

        // https://avatar-placeholder.iran.liara.run/
        // using this url to set default profile avatar
        const id = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar-placeholder.iran.liara.run/public/${id}.png`

        const newUser = await User.create({
            email, fullName, password, profilePic: randomAvatar,
        })

        const token = jwt.sign(
            { userId: newUser._id, },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        )

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        res.status(201).json({ success: true, user: newUser })

    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({ message: "Internal server error" })



    }

}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ message: "Invalid email or password" })

        const isCorrectPassword = await user.matchPassword(password)
        if (!isCorrectPassword) return res.status(401).json({ message: "Invalid email or password" })

        const token = jwt.sign(
            { userId: user._id, },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        )

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        res.status(200).json({ success: true, user })

    } catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({ message: "Internal server error" })



    }

}
export const logout = (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logged Out successfully" })

}