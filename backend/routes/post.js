import express from "express";
import { verifyToken } from "../utils/checkUserAuthentication.js";
import { create, getPosts, deletePost } from "../controllers/post.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPosts);
router.delete("/delete/:postId/:userId", verifyToken, deletePost);

export default router;
