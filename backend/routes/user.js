import express from "express";
import { testUser, updateUser, deleteUser } from "../controllers/user.js";
import { verifyToken } from "../utils/checkUserAuthentication.js";

const router = express.Router();

router.get("/test", testUser);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);

export default router;
