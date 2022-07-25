const { addCategory, getCategory } = require("../controllers/categoryController");
const { requireAuth, requireAdmin } = require("../middlewares/middleware");
const express = require('express');
const router = express.Router()

router.post("/addCategory", requireAuth, requireAdmin, addCategory);
router.get("/getCategory", getCategory);

module.exports = router
