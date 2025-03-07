const uploadToCloudinary = require("../utils/cloudinaryUpload.js");

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const filePath = req.file.path;
        const folder = "uploads";

        const imageUrl = await uploadToCloudinary(filePath, folder);

        res.status(200).json({ url: imageUrl });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Failed to upload image" });
    }
};

module.exports = { uploadImage };