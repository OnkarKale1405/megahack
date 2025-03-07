const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middlewares/auth.middleware");

const {
  addReview,
  getProductReviews,
} = require("../controllers/review.controller");

router.post("/:productId", protectRoute, addReview);
router.get("/:productId", getProductReviews);

module.exports = router;
