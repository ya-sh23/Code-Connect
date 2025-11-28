import express from "express";
import { login, logout, me, signup } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, me);
router.post("/logout", protect, logout);

export default router;
