const express = require("express");
const router = express.Router();

const {
  fetchProfileImage,
  createProfileImage,
  editProfileImageById,
  uploadToCloudinary,
} = require("../controllers/profileImage");

// Setup multer:
const multer = require("multer");
const upload = multer();

router.route("/").get(fetchProfileImage);
router.route("/").post(createProfileImage);
router.route("/").patch(editProfileImageById);
router.route("/upload").post(upload.single("fileSource"), uploadToCloudinary);

module.exports = router;
