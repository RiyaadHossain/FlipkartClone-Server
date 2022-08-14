const Category = require("../models/categoryModel")
const Product = require("../models/productModel")

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

exports.initialData = async (req, res) => {

    try {
        const category = await Category.find({}).exec()
        const product = await Product.find({}).populate({path: "category", select: "_id name"}).exec()

        return res.status(200).json({ category: getCategoryList(category), product })
    } catch (error) {
        return res.status(500).json({ error })

    }

}