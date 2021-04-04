
const encadreurController = require('../Controller/EcadreurController')
const auth = require('../middleware/auth-check')
const express = require("express");
const router = express.Router();


router.get('/api/encadreur/data/:id',auth,encadreurController.getEcadreur)


  module.exports = router;