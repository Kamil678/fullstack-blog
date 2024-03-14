import User from "../models/user.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password || email === "" || username === "" || password === "") {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ email, username, hashPassword });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
