import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password || email === "" || username === "" || password === "") {
    next(errorHandler(400, "All fields are required!"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ email, username, hashPassword });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (err) {
    next(err);
  }
};
