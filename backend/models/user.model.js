const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["admin", "vendor", "user"],
      default: "user",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
    },
    token: {
      type: String,
    }
  },
  { timestamps: true }
);

// Indexing location for geospatial queries, but only for users
userSchema.index({ location: "2dsphere" }, { sparse: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
