const EventCategory = require("../models/Category");
const asyncHandler = require("express-async-handler");

// @route POST /category
// @desc Creates a category.
// @access Public
exports.createCategory = asyncHandler(async (req, res, next) => {
  // Checking for valid input
  const { categoryName } = req.body;
  if (typeof categoryName !== "string" || categoryName.trim() === "") {
    res.status(406);
    throw new Error("Invalid input, please send non-empty string input.");
  }

  // Creates a new category.
  const category = await EventCategory.create(req.body);
  if (!category) {
    res.status(406);
    throw new Error(
      "Category creation failed. Please check if you have the correct input(s)"
    );
  }

  res.status(201).json({ success: { category: category } });
});

// @route GET /category/all
// @desc Get all the event categories
// @access Public
exports.allCategories = asyncHandler(async (req, res, next) => {
  const categories = await EventCategory.find();

  res.status(200).json({
    success: {
      categories: categories,
    },
  });
});

// @route GET /category?categoryName=
// @desc Get category with specific name.
// @access Public
exports.findCategoryByName = asyncHandler(async (req, res, next) => {
  const { categoryName } = req.query;

  const category = await EventCategory.findOne({ categoryName: categoryName });

  if (!category) {
    res.status(404);
    throw new Error(`No category exists with the given name: ${categoryName}`);
  }

  res.status(200).json({
    success: {
      id: category._id,
      name: category.categoryName,
    },
  });
});

// @route GET /category/:id
// @desc Get category with specific id.
// @access Public
exports.findCategoryById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const category = await EventCategory.findById(id);

  if (!category) {
    res.status(404);
    throw new Error(`No category exists with the given name: ${categoryName}`);
  }
  res.status(200).json({
    success: {
      id: category._id,
      name: category.categoryName,
    },
  });
});

// @route DELETE /category?categoryName=
// @desc Deletes a category by name.
// @access Public
exports.deleteCategoryByName = asyncHandler(async (req, res, next) => {
  const { categoryName } = req.query;
  const deleted = await EventCategory.findOneAndDelete({
    categoryName: categoryName,
  });

  if (!deleted) {
    res.status(404);
    throw new Error("No category with the given name could be deleted.");
  }

  res.status(200).json({ success: { message: "Category deleted" } });
});

// @route DELETE /category/:id
// @desc Deletes a category by id.
// @access Public
exports.deleteCategoryById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const deleted = await EventCategory.findByIdAndDelete(id);

  if (!deleted) {
    res.status(404);
    throw new Error("No category with the given name could be deleted.");
  }

  res.status(200).json({ success: { message: "Category deleted" } });
});
