
const express = require("express");
const auth = require('../middleware/auth-check');

const chartController = require('../Controller/ChartController')



const router= express.Router();


// get Departemnet

router.get('/api/v2/dashboard/:type/enc',auth,chartController.getEcadreurDep)

//get Sector
  
router.get('/api/v2/dashboard/:type/encSec',auth,chartController.getEcadreurSec)
//get Type

router.get('/api/v2/dashboard/:type/types',chartController.getTypes)
    
  
    //************************** chart date debut ,auth */

    router.get('/api/v2/dashboard/:type/datedebut',auth,chartController.getDateDebut)
  
      //************************** chart date fin ,auth */

      router.get('/api/v2/dashboard/:type/datefin',auth,chartController.getDateFin )



      

      module.exports = router;