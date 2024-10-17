import express from "express";
import { verifyToken } from "../utils/checkUserAuthentication.js";
import {
  createComment,
  deleteComment,
  editComment,
  getAllComments,
  getComments,
  likeComment,
} from "../controllers/comment.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getComments/:postId", getComments);
router.get("/getComments", verifyToken, getAllComments);
router.put("/like/:commentId", verifyToken, likeComment);
router.put("/edit/:commentId", verifyToken, editComment);
router.delete("/delete/:commentId", verifyToken, deleteComment);

export default router;
