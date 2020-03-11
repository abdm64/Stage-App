

 const mongoose =require('mongoose');


 
 require('../models/Student');
 const Students = mongoose.model( 'Students');

 exports.getStudents = (req,res, next)=>{
    console.log("exel is here")
    Students.find( { dateDebut : { $gte: req.params.gte, $lte: req.params.lte } }, { _id : false}).then(documents =>{
        console.log(documents)
         res.status(200).json({
            // message :"fetched !",
             students:documents
         });
     });
    }