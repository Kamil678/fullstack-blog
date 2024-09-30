import express from "express";
import { updateUser, deleteUser, getUsers } from "../controllers/user.js";
import { verifyToken } from "../utils/checkUserAuthentication.js";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.get("/getusers", verifyToken, getUsers);

export default router;
