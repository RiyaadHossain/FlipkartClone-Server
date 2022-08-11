const { signUpValidator, isReqValidated, signInValidator } = require('../validator/validator');
const { signup, signin, signout } = require('../controllers/adminContoller');
const express = require('express');
const router = express.Router()

router.post("/signup", signUpValidator, isReqValidated, signup)
router.post("/signin", signInValidator, isReqValidated, signin)
router.get("/signout", signout)


module.exports = router