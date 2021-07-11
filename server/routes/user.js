const express = require("express");
const router = express.Router();

const { validateUpdateUser } = require("../utils/validate");

const { doesUserExist, getUser, updateUser } = require("../controllers/user");
const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/", doesUserExist);
router.get("/me", isLoggedIn, getUser);
router.patch("/:id", validateUpdateUser, updateUser);

module.exports = router;
