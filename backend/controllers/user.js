import bcryptjs from "bcryptjs";
import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";

export const testUser = (req, res) => {
  res.json({ message: "API działa!!!!" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(
        403,
        "You are not allowed to update this user.",
        "Nie masz uprawnień do aktualizowania tego użytkownika."
      )
    );
  }

  if (req.body.password) {
    if (req.body.password.length < 5) {
      return next(
        errorHandler(
          400,
          "Password must be at least 5 characters.",
          "Hasło musi mieć co najmniej 6 znaków."
        )
      );
    }

    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 5 || req.body.username.length > 30) {
      return next(
        errorHandler(
          400,
          "Username must be at between 5 and 30 characters.",
          "Nazwa użytkownika musi mieć od 5 do 30 znaków."
        )
      );
    }

    if (req.body.username.includes(" ")) {
      return next(
        errorHandler(
          400,
          "Username cannot contain spaces.",
          "Nazwa użytkownika nie może zawierać spacji."
        )
      );
    }
  }

  if (req.body.username === "") {
    return next(
      errorHandler(
        400,
        "Username cannot be empty.",
        "Nazwa użytkownika nie może być pusta."
      )
    );
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          picture: req.body.picture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(
      errorHandler(
        403,
        "You are not allowed to delete this user.",
        "Nie masz uprawnień do usunięcia tego użytkownika."
      )
    );
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("Użytkownik został usunięty");
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(
        errorHandler(
          403,
          "You are not allowed to see all users",
          "Nie możesz uprawnień do zobaczenia wszystkich użytkowników"
        )
      );
    }
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUsers = await User.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (err) {
    next(err);
  }
};
