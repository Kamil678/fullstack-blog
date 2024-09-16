import { errorHandler } from "../utils/error.js";
import Post from "../models/post.js";
import { now } from "mongoose";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(
        403,
        "You are not allowed to cretae a post.",
        "Nie masz uprawnień do tworzenia postów."
      )
    );
  }

  if (!req.body.title || !req.body.content) {
    return next(
      errorHandler(
        403,
        "Please provide all required fields.",
        "Proszę uzupełnić wszystkie obowiązkowe pola."
      )
    );
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

export const getPosts = async (req, res, next) => {
  try {
    //Pagination
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find(
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.search && {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { content: { $regex: req.query.search, $options: "i" } },
        ],
      })
    )
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const nowDate = new Date();
    const oneMonthAgo = new Date(
      nowDate.getFullYear(),
      nowDate.getMonth() - 1,
      nowDate.getDate()
    );
    const totalPostsInLastMonth = Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      totalPostsInLastMonth,
    });
  } catch (err) {
    next(err);
  }
};
