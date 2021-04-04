 const express =require('express');
 const auth = require('../middleware/auth-check')
 const router= express.Router();
 const exelController = require('../Controller/ExelController')




 router.get('/api/v2/exel/:type/data/date/:gte/:lte',auth, exelController.getStudents);



 module.exports = router;
