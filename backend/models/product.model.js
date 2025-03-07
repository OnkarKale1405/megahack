const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: [{ type: String, required: true }], // Cloudinary image URLs
    farmerImage: { type: String, required: true },
    location: {
      type: { type: String, enum: ["Point"], required: true, default: "Point" },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (coords) {
            return coords.length === 2;
          },
          message: "Location must have exactly [longitude, latitude]",
        },
      },
    },
    marketplace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Marketplace",
      required: false, // Allow marketplace to be null initially
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approved: {
      type: Number,
      enum: [0, 1, 2], // 0 = pending, 1 = approved, 2 = rejected
      default: 0, // Default status is pending
    },
  },
  { timestamps: true }
);

productSchema.index({ location: "2dsphere" });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
