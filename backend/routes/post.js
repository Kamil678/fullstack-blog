import express from "express";
import { verifyToken } from "../utils/checkUserAuthentication.js";
import { create, getPosts } from "../controllers/post.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPosts);

export default router;
