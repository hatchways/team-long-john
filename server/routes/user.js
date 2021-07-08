const express = require("express");
const router = express.Router();
const { doesUserExist, getUser, updateUser } = require("../controllers/user");

router.post("/user", doesUserExist);
router.get("/user", isLoggedIn, getUser);
router.route("/:id").patch(updateUser);

module.exports = router;
