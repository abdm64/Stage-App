
const express = require("express");
const auth = require('./auth-check');

const chartController = require('../Controller/ChartController')



const router= express.Router();


// get Departemnet

router.get('/api/students/enc',auth,chartController.getEcadreurDep)

//get Sector
  
router.get('/api/students/encSec',auth,chartController.getEcadreurSec)
//get Type

router.get('/api/students/types',chartController.getTypes)
    
  
    //************************** chart date debut ,auth */

    router.get('/api/students/datedebut',auth,chartController.getDateDebut)
  
      //************************** chart date fin ,auth */

      router.get('/api/students/datefin',auth,chartController.getDateFin )



      

      module.exports = router;