const mongoose = require("mongoose");

const marketplaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  image: { type: String, required: true }, // Cloudinary image
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

marketplaceSchema.index({ location: "2dsphere" });

const Marketplace = mongoose.model("Marketplace", marketplaceSchema);
module.exports = Marketplace;
