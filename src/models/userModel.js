const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    unique: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  contactInfo: String,
});

module.exports = new mongoose.model("User", userSchema);
