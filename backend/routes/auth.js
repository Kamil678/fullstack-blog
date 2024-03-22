import express from "express";
import { signup, signin, googleLogin } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post('/signin', signin);
router.post('/google', googleLogin)


export default router;
