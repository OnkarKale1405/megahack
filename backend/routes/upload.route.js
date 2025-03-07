const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/upload.controller.js");
const upload  = require("../middlewares/upload.middleware.js");

const router = express.Router();

router.post("/", upload.single("image"), uploadImage);

module.exports = router;
