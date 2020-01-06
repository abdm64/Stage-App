const mongoose =require('mongoose');
require('../models/Evaluation');
const Evaluation = mongoose.model( 'Evaluation');







  exports.getEvaluation =  (req,res, next)=>{
    //console.log('hi there')
    
 Evaluation.findOne({matricule: req.params.id},{ _id :  0,__v: 0}, (err, docs) => {

    if (err) console.log(err);

    res.status(201).json(
        docs
  
      );
  
  
 
  })
     
  }
  exports.getMat = (req,res, next)=>{
    
    
    Evaluation.find({},{ _id :  0,__v: 0}, (err, docs) => {

      // console.log(docs.matricule)
       if (err)  res.send(err);
      var arr  = []
      for (doc of docs ){
        arr.push(doc.matricule)
      }
   
       res.status(201).json(
              arr
     
         );
     
     
    
     })
        
     }

 exports.postEvaluation = (req,res, next)=>{ 
    var  evaluation = new Evaluation(req.body)
   
    Evaluation.findOne({matricule: req.params.id},{ _id :  0,__v: 0}, (err, docs) => {

      if (err) console.log(err);
  
      if (!docs){      
 
        addEvaluation(res,evaluation)
  
} else{

  res.status(500).json({
    message : " Already Exist",
    err : err


  });
}
    
    
   
    })
   

    
        
     }

     function addEvaluation(res,evaluation) {

      evaluation.save().then(() => {

        res.status(201).json({
          message : "Operation succeeded",
     
    
        });
    
      }
    
    
      ).catch(err => {
       
    console.log(err)
        res.status(500).json({
          message : "Operation failed",
          error : err
    
    
        });
      }
    
      );




     }
  

 