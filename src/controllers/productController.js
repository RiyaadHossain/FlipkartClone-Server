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
  console.log(req.files);
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
    const products = await Product.find().populate("category").exec();
    
    const productByPrice = {
      productUnder5k: products.filter(product => product.price <= 5000),
      productUnder10k: products.filter(product => product.price > 5000 && product.price <= 10000),
      productUnder15k: products.filter(product => product.price > 10000 && product.price <= 15000),
      productUnder20k: products.filter(product => product.price > 15000 && product.price <= 20000),
      productUnder30k: products.filter(product => product.price > 20000 && product.price <= 30000),
    }
    
    return res.status(200).json({
      products, productByPrice
    });

  } catch (error) {
    return res.status(400).json({ error });
  }
};
