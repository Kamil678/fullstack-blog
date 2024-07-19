import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    next(errorHandler(400, "All fields are required!", "Wszystkie pola są wymagane."));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ email, username, password: hashPassword });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(errorHandler(400, "All fields are required!", "Wszystkie pola są wymagane!"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "User not found.", "Nie znaleziono takiego użytkownika."));
    }

    const checkedPassword = bcryptjs.compareSync(password, user.password);

    if (!checkedPassword) {
      return next(errorHandler(400, "Incorrect password.", "Niepoprawne hasło."));
    }

    const token = jwt.sign({ userId: user._id, username: user.username, isAdmin:user.isAdmin}, process.env.JWT_SECRET, { expiresIn: "1h" });
    const { password: pass, ...responseUser } = user._doc;

    res.status(200).cookie("token", token, { httpOnly: true }).json(responseUser);
  } catch (err) {
    next(err);
  }
};

export const googleLogin = async (req, res, next) => {
  const { email, name, googlePhoto } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin}, "somesupersecretsecret", { expiresIn: "1h" });
      const { password: pass, ...responseUser } = user._doc;

      res.status(200).cookie("token", token, { httpOnly: true }).json(responseUser);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        email,
        username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
        password: hashPassword,
        picture: googlePhoto,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, "somesupersecretsecret", { expiresIn: "1h" });
      const { password: pass, ...correctUser } = newUser._doc;

      res.status(200).cookie("token", token, { httpOnly: true }).json(correctUser);
    }
  } catch (err) {
    next(err);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json("Pomyślnie wylogowano użytkownika");
  } catch (err) {
    next(err);
  }
};
