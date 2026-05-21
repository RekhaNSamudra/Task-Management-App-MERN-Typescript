import express from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/authController";
import { validateAuth } from "../middlewares/validationMiddleware";

const router = express.Router();

router.post("/register", validateAuth, registerUser);
router.post("/login", validateAuth, loginUser);
router.post("/logout", logoutUser);

export default router;