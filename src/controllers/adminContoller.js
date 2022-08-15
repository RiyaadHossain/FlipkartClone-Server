const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Sign Up Controller_____________________________________
exports.signup = (req, res) => {
  const { firstName, lastName, email, userName, password } = req.body;

  // Check If the email already exist or not
  User.findOne({ email }).exec((err, user) => {
    if (user)
      return res.status(400).json({
        message: "Email Already Registered",
      });

    // Check If the userName already exist or not 
    User.findOne({ userName }).exec(async (err, user) => {
      if (user)
        return res.status(400).json({
          message: "Username Already Taken",
        });

      const hash_password = await bcrypt.hash(password, 10)

      // Create New User
      const newUser = new User({
        firstName,
        lastName,
        email,
        userName,
        hash_password,
        role: "admin",
      });

      newUser.save((err, data) => {
        if (err)
          return res.status(400).json({
            message: "Something went wrong",
          });

        if (data)
          return res.status(201).json({
            message: "Admin SignUp Successfully..!",
          });
      });
    });
  });
};

// Sign In Controller_____________________________________
exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err)
      return res
        .status(400)
        .json({ error: "Internal Server Error Occured..!" });

    if (user) {
      // Compare the password
      if (user.authenticate(password, User.password) && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.cookie("token", token, { expiresIn: "1h" })
        return res.status(200).json({
          token,
          user,
        });
      } else {
        return res.status(400).json({ error: "Invalid Email or Password..!" });
      }
    } else {
      return res.status(400).json({ error: "Something went Wrong..!" });
    }
  });
};


// Sign Out Controller_____________________________________
exports.signout = (req, res) => {
  res.clearCookie("token")
  return res.status(200).json({ message: "Signout Successfully ... !" })
}