
const express = require("express");
const router = express.Router();
const loginController = require('../Controller/LoginController')








//sign User

router.post("/api/v2/user/sign", loginController.signUser);



//login

router.post("/api/v2/user/login", loginController.loginUser)
module.exports = router;
