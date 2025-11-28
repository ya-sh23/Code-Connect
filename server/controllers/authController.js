import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// /api/user/signup
export const signup = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;

    if (!fullname || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullname,
      email,
      password: hashed,
    });
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "Signup successful",
      data: {
        user: { id: user._id, fullname: user.fullname, email: user.email },
        token,
      },
    });
  } catch (err) {
    console.error("signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and Password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login Successful",
      data: {
        user: { id: user._id, fullname: user.fullname, email: user.email },
        token,
      },
    });
  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const me = async (req, res) => {
  const { id, email } = req.user;
  const user = await User.findById(id).select("-password");
  res.json({ success: true, data: user });
};

export const logout = async (req, res) => {
  // Clear any cookies if set
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
};

