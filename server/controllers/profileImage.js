const ProfileImage = require("../models/ProfileImage");
const asyncHandler = require("express-async-handler");

// Setup cloudinary:
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "calend-app",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// @route GET /profileImage
// @desc Fetches profile image associated with user
// @access Public
exports.fetchProfileImage = asyncHandler(async (req, res, next) => {
  const { userId } = req.query;

  const profileImage = await ProfileImage.findOne({ userId: userId });

  if (!profileImage) {
    res.status(404);
    throw new Error("Profile image module not found for given user.");
  }

  res.status(200).json({ success: { profileImage: profileImage } });
});

// @route POST /profileImage
// @desc Creates a profile image.
// @access Public
exports.createProfileImage = asyncHandler(async (req, res, next) => {
  // Checking for empty input
  for (let key in req.body) {
    const value = req.body[key];
    if (value.trim() === "") {
      res.status(406);
      throw new Error("Invalid input, please do not send empty input(s)");
    }
  }

  const profileImage = await ProfileImage.create(req.body);
  if (!profileImage) {
    res.status(406);
    throw new Error(
      "Invalid input. Please check if you have the correct input(s)"
    );
  }

  res.status(201).json({ success: { profileImage: profileImage } });
});

// @route PATCH /profileImage
// @desc Edits (patches) a profile image by id.
// @access Public
exports.editProfileImageById = asyncHandler(async (req, res, next) => {
  const { userId } = req.query;
  const updates = req.body;
  const options = { new: true };

  const query = { userId: userId };
  const editted = await ProfileImage.findOneAndUpdate(query, updates, options);

  if (!editted) {
    res.status(400);
    throw new Error("Profile image with the given id could not be updated.");
  }

  res.status(200).json({ success: { profileImage: editted } });
});

// @route POST /profileImage/upload/
// @desc Uploads profile image to the cloudinary.
// @access Public
exports.uploadToCloudinary = asyncHandler(async (req, res, next) => {
  const cloudinaryRes = await communicateCloudinary(req);

  if (!cloudinaryRes) {
    res.status(400);
    throw new Error("Image could not be uploaded to cloudinary.");
  }
  res.status(200).json({ success: { cloudinaryRes: cloudinaryRes } });
});

communicateCloudinary = (req) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(function (err, res) {
        if (res) {
          resolve(res);
        } else {
          reject(err);
        }
      })
      .end(req.file.buffer);
  });
};
