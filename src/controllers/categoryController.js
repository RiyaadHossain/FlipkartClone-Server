const Category = require("../models/categoryModel");
const slugify = require("slugify");

// Function to Get Category in a Structured Way
const getCategoryList = (categories, parentId = null) => {
  let categoryList = [];
  let category;
  if (parentId === null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      parentId: cat.parentId,
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

  if (req.file) newCategory.categoryImg = `${process.env.APP_API}/public/${req.file.filename}`

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

// Get Category Controller_____________________________________
exports.updateCategory = async (req, res) => {
  const { _id, name, parentId, type } = req.body;

   try {
    if (name instanceof Array) {

      const updatedCategory = []
      for (let i = 0; name.length; i++) {
        const category = { name: name[i], type: type[i] }

        if (parentId[i] !== "") {
          category.parentId = parentId[i]
        }

        const result = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true })
        updatedCategory.push(result)
      }
      return res.status(200).json({ updatedCategory })

    } else {

      const updatedCategory = { name, type }
      if (parentId !== "") {
        updatedCategory.parentId = parentId
      }
      const result = await Category.findOneAndUpdate({ _id }, updatedCategory, { new: true })
      return res.status(200).json({ result })

    }

  } catch (error) {
    console.log(error)
    if (error) return res.status(500).json({ error })
  }
}