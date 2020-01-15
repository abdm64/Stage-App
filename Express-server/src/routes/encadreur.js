
const encadreurController = require('../Controller/EcadreurController')

const express = require("express");
const router = express.Router();


router.get('/api/encadreur/data/:id',encadreurController.getEcadreur)


  module.exports = router;