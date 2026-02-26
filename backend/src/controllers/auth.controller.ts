import { Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword } from "../utils/hash";
import { comparePassword } from "../utils/hash";
import { generateToken } from "../utils/token";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // hash password
    const hashedPassword = await hashPassword(password);

    // create user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // compare password
     const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
}

    // generate JWT token
     const token = generateToken(user._id.toString());

      res.json({
       message: "Login successful",
       token: token,
});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};