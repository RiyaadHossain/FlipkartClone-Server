const User = require("../models/userModel");

// Sign Up Controller_____________________________________
exports.signup = (req, res) => {
  
  // Check If the email already exist or not
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        message: "User Already Registered",
      });
    }

    // Check If the userName already exist or not
    User.findOne({ userName: req.body.userName }).exec((err, user) => {
      if (user) {
        return res.status(400).json({
          message: "Username Already Taken",
        });
      }

      const { firstName, lastName, email, userName, password } = req.body;

      // Create New User
      const newUser = new User({
        firstName,
        lastName,
        email,
        userName,
        password,
      });

      newUser.save((err, data) => {
        if (err)
          return res.status(400).json({
            message: "Something went wrong",
          });

        if (data)
          return res.status(201).json({
            data,
          });
      });
    });
  });
};

// Sign In Controller_____________________________________
exports.signin = (req, res) => {};
