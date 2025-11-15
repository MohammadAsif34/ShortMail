import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser); // register --> done --> works
router.post("/login", loginUser); // login --> done --> works
router.get("/me", protect, getMe);

export default router;
