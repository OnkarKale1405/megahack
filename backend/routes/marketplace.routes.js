const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middlewares/auth.middleware");
const {
  createMarketplace,
  getMarketplaceWithProducts,
  getMarketplacesNearUser,
} = require("../controllers/marketplaceController"); // Ensure correct import
const upload = require("../middlewares/upload.middleware");
// Route to create a marketplace
router.post(
  "/create",
  protectRoute, // Ensure that the user is authenticated
  upload.single("image"), // Ensure the image upload middleware is set
  createMarketplace // Controller function to create the marketplace
);

// // Route to get a marketplace with products within 5 km
// router.get("/:marketplaceId", protectRoute, getMarketplaceWithProducts);

// Route to get nearby marketplaces based on user's location
router.post("/nearby", protectRoute, getMarketplacesNearUser);

module.exports = router;
