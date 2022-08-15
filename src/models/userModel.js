const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);


// Instance Method - To compare password
userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

// Get FullName
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

module.exports = new mongoose.model("User", userSchema);
