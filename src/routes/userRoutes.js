import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/userController.js";
import { middleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser )

router.post("/login", loginUser)

router.get("/get_user", middleware, getUser)

export default router;