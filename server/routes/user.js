const express = require("express");
const router = express.Router();

const { doesUserExist, getUser, updateUser } = require("../controllers/user");
const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/", doesUserExist);
router.get("/me", getUser);
router.route("/:id").patch(updateUser);

module.exports = router;
