const { check } = require("express-validator");

exports.validateEmail = (email) => {
  return check(email).isEmail().normalizeEmail();
};
