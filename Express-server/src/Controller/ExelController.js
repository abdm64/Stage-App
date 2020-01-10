

 const mongoose =require('mongoose');


 
 require('../models/Student');
 const Students = mongoose.model( 'Students');

 exports.getStudents = (req,res, next)=>{

    Students.find( { dateDebut : { $gte: req.params.gte, $lte: req.params.lte } }, { _id : false}).then(documents =>{
         res.status(200).json({
            // message :"fetched !",
             students:documents
         });
     });
    }