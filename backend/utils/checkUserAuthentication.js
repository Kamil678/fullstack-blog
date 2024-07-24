import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    console.log("BRak tokena");
    return next(
      errorHandler(
        401,
        "User is unauthorized.",
        "Użytkownik jest niezautoryzowany."
      )
    );
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);
    if (err) {
      console.log("Zły tokrn");
      return next(
        errorHandler(
          401,
          "User is unauthorized.",
          "Użytkownik jest niezautoryzowany."
        )
      );
    }

    req.user = user;
    console.log(req.user, user);
    next();
  });
};
