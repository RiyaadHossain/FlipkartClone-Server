const { requireAuth, requireUser } = require("../middlewares/middleware");
const { addToCart } = require("../controllers/cartController");
const express = require('express');
const router = express.Router()

router.post("/addToCart", requireAuth, requireUser, addToCart);

module.exports = router
