import express from "express";
import { testUser, updateUser } from "../controllers/user.js";
import { verifyToken } from "../utils/checkUserAuthentication.js";

const router = express.Router();

router.get("/test", testUser);
router.put("/update/:userId", verifyToken, updateUser);

export default router;
