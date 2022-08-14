const Product = require("../models/productModel");
const slugify = require("slugify");

// To Add Product_________________________
exports.addProduct = (req, res) => {
  const { name, price, quantity, description, category } = req.body;

  let productImg = [];

  if (req.files.length > 0) {
    productImg = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const newProduct = new Product({
    name,
    price,
    quantity,
    category,
    productImg,
    description,
    slug: slugify(name),
    createdBy: req.user._id,
  });

  newProduct.save((err, data) => {
    
    if (err) return res.status(400).json({ err });

    if (data) return res.status(200).json({ data });
  });
};

// To Get Product_________________________
exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
