const { check, validationResult } = require("express-validator");

// Validate Sign Up Request
exports.signUpValidator = [
  check("firstName").notEmpty().withMessage("First Name is Required"),
  check("lastName").notEmpty().withMessage("Last Name is Required"),
  check("userName").notEmpty().withMessage("User Name is Required"),
  check("email").isEmail().withMessage("Valid Email is Required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 character"),
];

// Validate Sign In Request
exports.signInValidator = [
  check("email").isEmail().withMessage("Valid Email is Required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 character"),
];

// Handle Validator Errors
exports.isReqValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  next();
};
