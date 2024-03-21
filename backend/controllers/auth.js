import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    next(errorHandler(400, "All fields are required!"));
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
  const {email, password} = req.body

  if(!email || !password){
    next(errorHandler(400, 'Wszystkie pola są wymagane!'))
  }

  try{
    const user = await User.findOne({email})

    if(!user){
      return next(errorHandler(404, 'Nie znaleziono takiego użytkownika.'))
    }

    const checkedPassword = bcryptjs.compareSync(password, user.password)

    if(!checkedPassword){
      return next(errorHandler(400, 'Niepoprawne hasło.'))
    }

    const token = jwt.sign({userId:user._id, username:user.username}, "somesupersecretsecret", {expiresIn:'1h'});
    const {password:pass, ...responseUser} = user._doc

    res.status(200).cookie('token', token, {httpOnly:true}).json(responseUser);
  } catch(err){
    next(err);
  }
}
