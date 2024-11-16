import express from "express";
import { createProfile, updateProfile, getProfile } from "../controllers/deliveryController.js";

const router = express.Router();
router.get("/getProfile/:id", getProfile)
router.post("/profile", createProfile);

router.put("/profile/:id", updateProfile);

export default router;
