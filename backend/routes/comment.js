import express from "express";
import { verifyToken } from "../utils/checkUserAuthentication.js";
import {
  createComment,
  editComment,
  getComments,
  likeComment,
} from "../controllers/comment.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getComments/:postId", getComments);
router.put("/like/:commentId", verifyToken, likeComment);
router.put("/edit/:commentId", verifyToken, editComment);

export default router;
