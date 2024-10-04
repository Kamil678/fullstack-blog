import express from "express";
import { verifyToken } from "../utils/checkUserAuthentication.js";
import { createComment } from "../controllers/comment.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);

export default router;
