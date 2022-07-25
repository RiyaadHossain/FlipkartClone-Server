const { addProduct, getProduct } = require("../controllers/productController");
const { requireAuth, requireAdmin } = require("../middlewares/middleware");
const express = require('express');
const router = express.Router()

router.post("/addProduct", requireAuth, requireAdmin, addProduct);
router.get("/getProduct", getProduct);

module.exports = router
