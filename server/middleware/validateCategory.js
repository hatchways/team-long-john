exports.validateInput = (req, res, next) => {
  const { categoryName } = req.body;

  if (typeof categoryName !== "string" || categoryName.trim() === "") {
    res.status(406);
    throw new Error("Invalid input, please send non-empty string input.");
  }

  // We are good to move on.
  next();
};
