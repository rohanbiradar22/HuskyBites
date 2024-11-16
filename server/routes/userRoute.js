import express from "express";
import {
  getUsersController,
  deleteUserController
} from "../controllers/user-controller/userController.js";
// import { userAuthenticationMiddleware } from "../middlewares/authMiddlerware.js";

const router = express.Router();

router.get("/getUsers", getUsersController);

router.delete("/:id", deleteUserController);

export default router;
