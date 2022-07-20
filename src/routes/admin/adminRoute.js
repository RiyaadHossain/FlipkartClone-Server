const { signup, signin } = require('../../controllers/admin/adminContoller');
const { requireAuth } = require('../../middlewares/requireAuth');
const express = require('express');
const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)

router.get("/profile", requireAuth, (req, res) => {
    res.status(200).json({message: "Ok"})
})

module.exports = router