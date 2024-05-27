import express from "express";
import { signup, signin, googleLogin, signout } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/google", googleLogin);

export default router;
