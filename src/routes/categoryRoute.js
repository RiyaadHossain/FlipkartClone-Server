const { addCategory, getCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");
const { requireAuth, requireAdmin } = require("../middlewares/middleware");
const shortid = require("shortid");
const express = require("express");
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

router.post("/addCategory", requireAuth, requireAdmin, upload.single("categoryImg"), addCategory);
router.get("/getCategory", getCategory);
router.patch("/updateCategory", upload.array("categoryImg"), updateCategory);
router.post("/deleteCategory", deleteCategory);

module.exports = router;
