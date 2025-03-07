const Marketplace = require("../models/marketplace.model");
const Product = require("../models/product.model");
const cloudinary = require("../lib/cloudinary");

// Create Marketplace (Unchanged)
const createMarketplace = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, coordinates } = req.body;
    if (!name || !coordinates || !req.file) {
      return res
        .status(400)
        .json({ message: "All fields are required, including an image" });
    }

    let parsedCoordinates;
    try {
      parsedCoordinates = JSON.parse(coordinates);
      if (!Array.isArray(parsedCoordinates) || parsedCoordinates.length !== 2) {
        throw new Error();
      }
    } catch (err) {
      return res.status(400).json({
        message:
          "Invalid coordinates format. Must be an array [longitude, latitude]",
      });
    }

    // Check if a marketplace already exists with the same coordinates
    const existingMarketplace = await Marketplace.findOne({
      "location.coordinates": parsedCoordinates,
    });

    if (existingMarketplace) {
      return res.status(400).json({
        message: "Marketplace with these coordinates already exists",
      });
    }

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "marketplaces",
    });

    const marketplace = new Marketplace({
      name,
      location: { type: "Point", coordinates: parsedCoordinates },
      image: cloudinaryResponse.secure_url,
      createdBy: req.user._id,
    });

    await marketplace.save();
    res
      .status(201)
      .json({ message: "Marketplace created successfully", marketplace });
  } catch (error) {
    console.error("Marketplace Creation Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Haversine formula to calculate distance between two points in kilometers
const haversineDistance = (coords1, coords2) => {
  const toRadians = (deg) => (deg * Math.PI) / 180;

  const [lon1, lat1] = coords1; // User location (longitude, latitude)
  const [lon2, lat2] = coords2; // Marketplace location (longitude, latitude)

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

// Get Marketplaces Near User (Updated with Haversine distance and products)
// Get Marketplaces Near User (Updated with manual loop for closest distance)
const getMarketplacesNearUser = async (req, res) => {
  try {
    const userLocation = req.user.location ;

    // Fetch all marketplaces
    const marketplaces = await Marketplace.find();

    if (!marketplaces || marketplaces.length === 0) {
      return res.status(404).json({ message: "No marketplaces found" });
    }

    // Create an array to hold distances and corresponding marketplaces
    const distances = [];

    // Calculate distance for each marketplace and store the result
    marketplaces.forEach((marketplace) => {
      const distance = haversineDistance(
        userLocation.coordinates,
        marketplace.location.coordinates
      );
      distances.push({ marketplace, distance });
    });

    // Sort the distances in ascending order (closest first)
    distances.sort((a, b) => a.distance - b.distance);

    // Filter the top marketplaces (within 5 km)
    const nearbyMarketplaces = distances
      .filter((entry) => entry.distance <= 5)
      .map((entry) => entry.marketplace); // Only marketplaces within 5 km

    if (nearbyMarketplaces.length === 0) {
      return res.status(404).json({ message: "No nearby marketplaces found" });
    }

    // Now find all products within the nearby marketplaces
    const nearbyProducts = await Product.find({
      marketplace: { $in: nearbyMarketplaces.map((m) => m._id) },
      approved: 1, // Only approved products
    });

    res.status(200).json({
      marketplaces: nearbyMarketplaces,
      products: nearbyProducts,
    });
  } catch (error) {
    console.error("Error getting marketplaces:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createMarketplace,
  getMarketplacesNearUser,
};
