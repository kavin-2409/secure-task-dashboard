import express from "express";
import { registerUser,loginUser } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
  res.json({ message: "You accessed a protected route!" });
});

export default router;