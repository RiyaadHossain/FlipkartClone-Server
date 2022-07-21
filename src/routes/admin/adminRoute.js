const { signUpValidator, isReqValidated, signInValidator } = require('../../validator/validator');
const { signup, signin } = require('../../controllers/admin/adminContoller');
const { requireAuth } = require('../../middlewares/requireAuth');
const express = require('express');
const router = express.Router()

router.post("/signup", signUpValidator, isReqValidated, signup)
router.post("/signin", signInValidator, isReqValidated, signin)

router.get("/profile", requireAuth, (req, res) => {
    res.status(200).json({message: "Ok"})
})

module.exports = router