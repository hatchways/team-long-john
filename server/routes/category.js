const express = require("express");
const router = express.Router();

const {
  createCategory,
  allCategories,
  findCategoryByName,
  findCategoryById,
  deleteCategoryByName,
  deleteCategoryById,
} = require("../controllers/category");

router.route("/").post(createCategory);
router.route("/all").get(allCategories);
router.route("/").get(findCategoryByName);
router.route("/:id").get(findCategoryById);
router.route("/").delete(deleteCategoryByName);
router.route("/:id").delete(deleteCategoryById);

module.exports = router;
