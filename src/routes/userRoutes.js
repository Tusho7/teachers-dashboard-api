import express from "express";
import { registerUser, loginUser, getUser, logoutUser, updateUser } from "../controllers/userController.js";
import authMiddleware, { middleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser )

router.post("/login", loginUser)

router.get("/get_user", middleware, getUser)

router.post("/logout", authMiddleware, logoutUser)

router.put("/:id", authMiddleware, updateUser);

export default router;