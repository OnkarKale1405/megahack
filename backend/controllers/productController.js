const Product = require("../models/product.model");
const Marketplace = require("../models/marketplace.model");
const uploadToCloudinary = require("../utils/cloudinaryUpload");
const mongoose = require("mongoose");

const createProduct = async (req, res) => {
  try {
    let { name, description, category, price, quantity, location } = req.body;
    let { farmerImage, images } = req.files;

    console.log(req.body.images);

    if (!location)
      return res.status(400).json({ message: "Location is required" });

    if (typeof location === "string") {
      try {
        location = JSON.parse(location);
      } catch (err) {
        return res.status(400).json({ message: "Invalid location format" });
      }
    }

    if (!location.coordinates || location.coordinates.length !== 2) {
      return res.status(400).json({
        message: "Location must have 'coordinates' as [longitude, latitude]",
      });
    }

    location.type = "Point";

    // ✅ Find nearest marketplace manually
    const nearestMarketplace = await findNearestMarketplace(
      location.coordinates
    );

    if (!nearestMarketplace) {
      return res.status(404).json({ message: "No nearby marketplace found." });
    }

    console.log("Assigned Marketplace:", nearestMarketplace.name);

    let farmerImageUrl = "";
    if (farmerImage && farmerImage[0]) {
      farmerImageUrl = await uploadToCloudinary(
        farmerImage[0].path,
        "farmer-images"
      );
    }

    let imageUrls = [];
    if (images && images.length > 0) {
      for (let file of images) {
        const imageUrl = await uploadToCloudinary(file.path, "product-images");
        imageUrls.push(imageUrl);
      }
    }

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      quantity,
      location,
      images: imageUrls,
      farmerImage: farmerImageUrl,
      vendor: req.user._id,
      marketplace: nearestMarketplace._id, // ✅ Assigning the nearest marketplace
      approved: 0, // Default pending approval
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Create Product Error:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// New function to find the nearest marketplace manually
const findNearestMarketplace = async (productCoordinates) => {
  try {
    const marketplaces = await Marketplace.find({}, "location name");

    if (marketplaces.length === 0) {
      return null; // No marketplaces available
    }

    let nearestMarketplace = null;
    let minDistance = Infinity;

    marketplaces.forEach((marketplace) => {
      const distance = haversineDistance(
        productCoordinates,
        marketplace.location.coordinates
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestMarketplace = marketplace;
      }
    });

    return nearestMarketplace;
  } catch (error) {
    console.error("Error finding nearest marketplace:", error);
    return null;
  }
};

// Haversine formula to calculate the distance between two coordinates
const haversineDistance = (coords1, coords2) => {
  const toRadians = (deg) => (deg * Math.PI) / 180;

  const [lon1, lat1] = coords1;
  const [lon2, lat2] = coords2;

  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const product = await Product.findOne({
      _id: productId,
      vendor: req.user._id,
    });

    if (!product) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this product" });
    }

    Object.assign(product, updates);
    product.approved = 0; // Set to pending approval again
    await product.save();

    res
      .status(200)
      .json({ message: "Product updated, awaiting admin approval", product });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if the product exists and if the vendor owns it
    const product = await Product.findOneAndDelete({
      _id: productId,
      vendor: req.user._id,
    });

    if (!product) {
      return res
        .status(403)
        .json({ message: "Unauthorized or product not found" });
    }

    // Optionally delete images from Cloudinary
    await deleteImagesFromCloudinary(product.images);
    await deleteImagesFromCloudinary([product.farmerImage]);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to delete images from Cloudinary
const deleteImagesFromCloudinary = async (imageUrls) => {
  try {
    for (let imageUrl of imageUrls) {
      const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract publicId from URL
      await cloudinary.uploader.destroy(publicId); // Delete the image from Cloudinary
    }
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
  }
};

const approveProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.approved === 1) {
      return res.status(400).json({ message: "Product already approved" });
    }

    product.approved = 1; // Approved status
    await product.save();

    res.status(200).json({ message: "Product approved successfully" });
  } catch (error) {
    console.error("Approve Product Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const rejectProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.approved === 2) {
      return res.status(400).json({ message: "Product already rejected" });
    }

    product.approved = 2; // Rejected status
    await product.save();

    res.status(200).json({ message: "Product rejected successfully" });
  } catch (error) {
    console.error("Reject Product Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ approved: 0 }).populate(
      "vendor",
      "fullName"
    );
    res.status(200).json({ products });
  } catch (error) {
    console.error("Get Pending Products Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getProductsNearMarketplace = async (req, res) => {
  try {
    const { marketplaceId } = req.params;

    // Debugging logs
    console.log("Received Marketplace ID:", marketplaceId);

    // Validate if marketplaceId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(marketplaceId)) {
      return res.status(400).json({ message: "Invalid Marketplace ID" });
    }

    // Find the marketplace by ID
    const marketplace = await Marketplace.findById(marketplaceId);
    if (!marketplace) {
      return res.status(404).json({ message: "Marketplace not found" });
    }

    console.log("Marketplace Found:", marketplace);

    // Fetch products related to the marketplace
    const products = await Product.find({
      marketplace: new mongoose.Types.ObjectId(marketplaceId), // Ensure correct ID format
      approved: 1, // Only fetch approved products
    }).populate("vendor", "fullName"); // Populate vendor information

    console.log("Found Products:", products); // Debugging log

    // Respond with the products in the marketplace
    res.status(200).json({ products });
  } catch (error) {
    console.error("Get Products Near Marketplace Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProductPrice = async (req, res) => {
  try {
    const { productId } = req.params;
    const { price } = req.body;
    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }

    const product = await Product.findOne({
      _id: productId,
      vendor: req.user._id,
    });

    if (!product) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this product" });
    }

    product.price = price;
    product.approved = 0; // Require admin re-approval
    await product.save();

    res
      .status(200)
      .json({ message: "Price updated, awaiting admin approval", product });
  } catch (error) {
    console.error("Update Product Price Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// vendor
const getPendingProductsOfVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const products = await Product.find({ vendor: vendorId, approved: 0 }).populate(
      "vendor",
      "fullName"
    );
    res.status(200).json({ products });
  } catch (error) {
    console.error("Get Pending Products Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getApprovedProductsOfVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const products = await Product.find({ vendor: vendorId, approved: 1 }).populate(
      "vendor",
      "fullName"
    );
    res.status(200).json({ products });
  } catch (error) {
    console.error("Get Approved Products Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRejectedProductsOfVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const products = await Product.find({ vendor: vendorId, approved: -1 }).populate(
      "vendor",
      "fullName"
    );
    res.status(200).json({ products });
  } catch (error) {
    console.error("Get Rejected Products Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
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
};
