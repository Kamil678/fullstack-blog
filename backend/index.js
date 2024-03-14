import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000!!!!!");
  mongoose
    .connect(process.env.MONGO_CONNECTION)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.log(err);
    });
});
