import { errorHandler } from "../utils/error.js";
import Post from "../models/post.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to cretae a post.", "Nie masz uprawnień do tworzenia postów."));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(403, "Please provide all required fields.", "Proszę uzupełnić wszystkie obowiązkowe pola."));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    ...req.body,
    slug,
    author: req.user.id,
  });

  try {
    const savedPost = await newPost.save();

    res.status(201).json({ success: true, post: savedPost });
  } catch (err) {
    next(err);
  }
};
