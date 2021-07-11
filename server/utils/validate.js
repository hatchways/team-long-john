const { body, validationResult } = require("express-validator");

exports.validateUpdateUser = [
  body("email", "Please enter a valid email address").isEmail(),
  body("username", "No spaces are allowed in the username").custom(
    (value) => !/\s/.test(value)
  ),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
];
