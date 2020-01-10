 const express =require('express');
 const auth = require('./auth-check')
 const router= express.Router();
 const exelController = require('../Controller/ExelController')




 router.get('/api/students/data/date/:gte/:lte',auth, exelController.getStudents);



 module.exports = router;
