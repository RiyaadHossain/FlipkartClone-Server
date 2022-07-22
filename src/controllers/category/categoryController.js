const Category = require("../../models/categoryModel");
const slugify = require("slugify");

// Function to Get Category
const getCategoryList = (categories, parentId = null) => {
  let categoryList = [];
  let category;
  if (parentId === null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (cat of category){ 
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      children: getCategoryList(categories, cat._id)
    })
  }
  return categoryList
};

// Add Category Controller_____________________________________
exports.addCategory = (req, res) => {
  const { name } = req.body;

  const newCategory = Category({
    name: name,
    slug: slugify(name),
  });

  if (req.body.parentId) newCategory.parentId = req.body.parentId;

  newCategory.save((err, category) => {
    if (err) return res.status(400).json({ error: err.message });
    if (category) return res.status(201).json({ category });
  });
};

// Get Category Controller_____________________________________
exports.getCategory = (req, res) => {
  Category.find().exec((err, category) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });

    const categoryList = getCategoryList(category);

    if (category) return res.status(200).json({ categoryList });
  });
};
