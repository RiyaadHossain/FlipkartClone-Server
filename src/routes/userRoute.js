const { isReqValidated, signUpValidator, signInValidator } = require("../validator/validator");
const { signup, signin } = require("../controllers/userContoller");
const express = require("express");
const router = express.Router();

router.post("/signup", signUpValidator, isReqValidated, signup);
router.post("/signin", signInValidator, isReqValidated, signin);

module.exports = router;
