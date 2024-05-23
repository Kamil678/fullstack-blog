import bcryptjs from "bcryptjs";
import User from "../models/user";
import { errorHandler } from "../utils/error";

export const testUser = (req, res) => {
  res.json({ message: "API działa!!!!" });
};

export const updateUser = async (req, res, next) => {
  console.log(req.user);
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user.", "Nie masz uprawnień do aktualizowania tego użytkownika."));
  }

  if (req.body.password) {
    if (req.body.password.length < 5) {
      return next(errorHandler(400, "Password must be at least 5 characters.", "Hasło musi mieć co najmniej 6 znaków."));
    }

    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 5 || req.body.username.length > 30) {
      return next(errorHandler(400, "Username must be at between 5 and 30 characters.", "Nazwa użytkownika musi mieć od 5 do 30 znaków."));
    }

    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces.", "Nazwa użytkownika nie może zawierać spacji."));
    }

    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
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
  }
};
