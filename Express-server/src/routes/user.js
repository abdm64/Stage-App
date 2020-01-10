
const express = require("express");
const router = express.Router();
const loginController = require('../Controller/LoginController')








//sign User

router.post("/api/user/sign", loginController.signUser);



//login

router.post("/api/user/login", loginController.loginUser)
module.exports = router;
