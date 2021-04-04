

 const mongoose =require('mongoose');
 require('../models/Student');
 require('../models/Apprenti');
 const Students = mongoose.model( 'Students');
 const Apprenti = mongoose.model('Apprenti')



 exports.getStudents = (req,res, next)=>{
    const type = req.params.type
    const ModelType = getModelType(type,Students,Apprenti)
  
    ModelType.find( { dateDebut : { $gte: req.params.gte, $lte: req.params.lte } }, { _id : false}).then(documents =>{
        console.log(documents)
         res.status(200).json({
            // message :"fetched !",
             students:documents
         });
     });
    }

    function getModelType(type,studentModel,apprentiModel){
        if ( type === "0"){
      
      
          return studentModel
        }
      
        return apprentiModel
      
      
      }
      