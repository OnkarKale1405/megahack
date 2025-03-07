const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const {
  protectRoute,
  authorizeRoles,
} = require("../middlewares/auth.middleware");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  approveProduct,
  rejectProduct,
  getPendingProducts,
  updateProductPrice,
  getProductsNearMarketplace,
  getPendingProductsOfVendor,
  getApprovedProductsOfVendor,
  getRejectedProductsOfVendor
} = require("../controllers/productController");

// Vendor Routes
router.post(
  "/",
  protectRoute,
  authorizeRoles("vendor"),
  upload.fields([
    { name: "images", maxCount: 5 }, // Handling multiple product images
    { name: "farmerImage", maxCount: 1 }, // Handling single farmer image
  ]),
  createProduct
);

router.put(
  "/:productId",
  protectRoute,
  authorizeRoles("vendor"),
  updateProduct
);

router.delete(
  "/:productId",
  protectRoute,
  authorizeRoles("vendor"),
  deleteProduct
);

router.patch(
  "/:productId/price",
  protectRoute,
  authorizeRoles("vendor"),
  updateProductPrice
);

// Admin Routes
router.patch(
  "/approve/:productId",
  protectRoute,
  authorizeRoles("admin"),
  approveProduct
);

router.patch(
  "/reject/:productId",
  protectRoute,
  authorizeRoles("admin"),
  rejectProduct
);

router.get(
  "/pending",
  protectRoute,
  authorizeRoles("admin"),
  getPendingProducts
);

// Get all products in a marketplace
router.get(
  "/marketplace/:marketplaceId",
  protectRoute,
  getProductsNearMarketplace
);

// for vendor
router.get(
  "/vendor/approved",
  protectRoute,
  authorizeRoles("vendor"),
  getApprovedProductsOfVendor
)
router.get(
  "/vendor/pending",
  protectRoute,
  authorizeRoles("vendor"),
  getPendingProductsOfVendor
)
router.get(
  "/vendor/rejected",
  protectRoute,
  authorizeRoles("vendor"),
  getRejectedProductsOfVendor
)

module.exports = router;
