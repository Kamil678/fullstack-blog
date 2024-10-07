import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (req.user.id !== userId) {
      return next(
        errorHandler(
          403,
          "You are not allowed to cretae a post.",
          "Nie masz uprawnień do dodania komentarza."
        )
      );
    }

    if (!content) {
      return next(
        errorHandler(
          403,
          "Please provide all required fields.",
          "Proszę uzupełnić wszystkie obowiązkowe pola."
        )
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    const savedComment = await newComment.save();

    res.status(201).json({ success: true, comment: savedComment });
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, comments: comments });
  } catch (err) {
    next(err);
  }
};
