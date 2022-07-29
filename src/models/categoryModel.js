const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  categoryImg: String,
  parentId: String,
});

module.exports = new mongoose.model("Category", categorySchema);
