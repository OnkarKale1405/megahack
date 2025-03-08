const axios = require("axios");
const dotenv = require("dotenv");
const Marketplace = require("../models/marketplace.model");
const Product = require("../models/product.model");
const Review = require("../models/review.model");

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

exports.getChatbotResponse = async (req, res) => {
    try {
        const { message, initial } = req.body;

        // ✅ Step 1: Initial Greeting
        if (initial) {
            return res.json({
                message: "Hello! How can I assist you today?",
                suggestions: ["🛍️ What can I get from FreshFood?"],
            });
        }

        if (!message) {
            return res.status(400).json({ error: "Message is required." });
        }

        let responseMessage = "Sorry, I didn't understand your request.";
        let suggestions = [];
        const lowerMessage = message.toLowerCase();

        // ✅ What can I get from FreshFood?
        if (lowerMessage.includes("what can i get from freshfood")) {
            responseMessage = "FreshFood connects you to local markets!";
            suggestions = ["📍 Here are some marketplaces near you"];
        }

        // ✅ Find Marketplaces Near User
        else if (lowerMessage.includes("marketplaces near you")) {
            const marketplaces = await Marketplace.find().select("_id name");

            if (marketplaces.length === 0) {
                responseMessage = "No markets found.";
            } else {
                responseMessage =
                    "Here are some local markets near you:\n" +
                    marketplaces.map((m) => `- ${m.name}`).join("\n");
                suggestions = ["🛒 Want to see available products?"];
            }
        }

        // ✅ Get Available Products (Only from valid marketplaces)
        else if (lowerMessage.includes("available products")) {
            const marketplaces = await Marketplace.find().select("_id name");

            if (marketplaces.length === 0) {
                responseMessage = "No markets found.";
            } else {
                const marketplaceProducts = await Promise.all(
                    marketplaces.map(async (market) => {
                        const products = await Product.find({
                            marketplace: market._id,
                            approved: 1, // Only approved products
                        })
                            .select("name price marketplace")
                            .populate("marketplace", "name");

                        return products.length > 0
                            ? `🛒 **${market.name}**:\n${products
                                .map((p) => `- ${p.name} ($${p.price})`)
                                .join("\n")}`
                            : null;
                    })
                );

                // ✅ Ensure only valid marketplaces are shown
                const validMarketplaces = marketplaceProducts.filter(Boolean);
                responseMessage =
                    validMarketplaces.length > 0
                        ? validMarketplaces.join("\n\n")
                        : "No products available in nearby marketplaces.";
            }

            suggestions = ["⭐ Want to see product reviews?"];
        }

        // ✅ Get Product Reviews
        else if (lowerMessage.includes("product reviews")) {
            const reviews = await Review.find()
                .populate("product", "name price")
                .limit(5);
            responseMessage =
                reviews.length > 0
                    ? "Here are some product reviews:\n" +
                    reviews
                        .map(
                            (r) => `- ${r.product.name}: ${r.comment} (⭐ ${r.rating}/5)`
                        )
                        .join("\n")
                    : "No reviews available.";
        }

        // ✅ Step 3: AI Response (Fallback)
        if (responseMessage === "Sorry, I didn't understand your request.") {
            try {
                const response = await axios.post(GEMINI_API_URL, {
                    contents: [{ role: "user", parts: [{ text: message }] }],
                });

                responseMessage =
                    response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                    "I'm not sure how to respond. Try asking about marketplaces or products!";

                suggestions = ["🛍️ What can I get from FreshFood?"];
            } catch (geminiError) {
                console.error(
                    "Gemini API error:",
                    geminiError.response?.data || geminiError.message
                );
                responseMessage =
                    "I'm currently unable to process your request. Please try again later.";
            }
        }

        res.json({ message: responseMessage, suggestions });
    } catch (error) {
        console.error("Chatbot error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
