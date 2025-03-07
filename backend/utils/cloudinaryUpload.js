const cloudinary = require("../lib/cloudinary");
const fs = require("fs");

const uploadToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
    });
    fs.unlinkSync(filePath); // Delete file after upload
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Image upload failed.");
  }
};

module.exports = uploadToCloudinary;
