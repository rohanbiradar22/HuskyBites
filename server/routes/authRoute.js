import express from "express";
import {
  loginController,
  registerController,
  getCurrentUserController,
  generateOtpController,
  createNewPasswordController
} from "../controllers/auth-controller/authController.js";
import { userAuthenticationMiddleware } from "../middlewares/authMiddlerware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.patch("/generate-otp", generateOtpController);
router.patch("/update-password", createNewPasswordController);

router.get("/getCurrentUser", userAuthenticationMiddleware, getCurrentUserController);

export default router;
