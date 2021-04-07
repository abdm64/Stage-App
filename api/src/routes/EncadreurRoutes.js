
const encadreurController = require('../controller/EcadreurController')
const auth = require('../middleware/auth-check')
const express = require("express");
const router = express.Router();

//,auth
router.get('/api/v2/encadreur/data/:id',encadreurController.getEcadreur)


  module.exports = router;