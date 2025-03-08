const express = require("express");
const { getChatbotResponse } = require("../controllers/chatbotController");
const { protectRoute } = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/", getChatbotResponse);

module.exports = router;
