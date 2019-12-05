const express =require('express');

 const mongoose =require('mongoose');
 const auth = require('./auth-check')
 
 const app = express.Router();

 mongoose.Promise = global.Promise;


 //connect to  mongoose






  require('../models/Student');
 const Students = mongoose.model( 'Students');


 app.get('/api/students/data/date/:gte/:lte',auth,(req,res, next)=>{

  Students.find( { dateDebut : { $gte: req.params.gte, $lte: req.params.lte } }, { _id : false}).then(documents =>{
       res.status(200).json({
          // message :"fetched !",
           students:documents
       });
   });
  });

























 module.exports = app;
