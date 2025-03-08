const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./lib/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const marketplaceRoutes = require("./routes/marketplace.routes");
const productRoutes = require("./routes/product.route");
const reviewRoutes = require("./routes/review.routes");
const uploadRouter = require("./routes/upload.route.js");
const chatbotRoutes = require("./routes/chatbot.routes.js")

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/marketplaces", marketplaceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/upload", uploadRouter);
app.use("/api/chatbot", chatbotRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));