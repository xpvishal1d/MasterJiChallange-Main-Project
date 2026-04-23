import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

// router.get

router.route("/register").post(registerUser)
// router.route("/login").post(registerUser)

export default router;