const express = require("express");
const router = express.Router();

const {
  loginUser,
  signup,
  logout,
  updateProfile,
  checkAuth,
} = require("../controllers/authController");
const { protectRoute } = require("../middlewares/auth.middleware");

router.post("/login", loginUser);
router.post("/signup", signup);
router.post("/logout", protectRoute, logout);
router.get("/check", protectRoute, checkAuth);
module.exports = router;
