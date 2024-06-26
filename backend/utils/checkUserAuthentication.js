import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(errorHandler(401, "User is unauthorized.", "Użytkownik jest niezautoryzowany."));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "User is unauthorized.", "Użytkownik jest niezautoryzowany."));
    }

    req.user = user;
    next();
  });
};
