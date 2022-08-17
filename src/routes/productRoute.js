const { addProduct, getProduct } = require("../controllers/productController");
const { requireAuth, requireAdmin } = require("../middlewares/middleware");
const express = require("express");
const shortid = require("shortid");
const multer = require("multer");
const router = express.Router(); 
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "upload"));
  },
  filename: function (req, file, cb) {
    cb(null, `${shortid.generate()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/addProduct",
  requireAuth,
  requireAdmin,
  upload.array("productImg"),
  addProduct
);
router.get("/getProductBySlug/:slug", getProduct);

module.exports = router;
