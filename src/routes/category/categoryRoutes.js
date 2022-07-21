const { addCategory, getCategory } = require("../../controllers/category/categoryController");
const express = require('express');
const router = express.Router()

router.post("/addCategory", addCategory);
router.get("/getCategory", getCategory);

module.exports = router
