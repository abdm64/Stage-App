
const mongoose =require('mongoose');
require('../models/URL');
const RandomHash = mongoose.model( 'URL');




exports.postRandomhash = (req,res,next)=>{ 
   


    var  random= new RandomHash(req.body)

    // find and delete the old one  by id 
    let id =  req.body.id
    try {
       deleteRandom(res,id)
        
    } catch (err) {
         next(err);
    }
    try {
//save new url id random
saveRandom(res,random) 
    } catch (err) {

      next(err)
    }
    
   
    
}

exports.getUrlById = (req,res) => {
  

  RandomHash.findOne({ id: req.params.id }, {_id : 0 }, (err, doc)   => {
    if (err) return console.log(err);
    
    res.status(200).json({
      doc
    }) ;
  });


}

exports.deleteUrlById = (req,res) => {

  RandomHash.deleteOne({ id: req.params.id }).then(()=> {

      res.status(200).send("Yep")


  }).catch(err => {

    res.status(500).json({
      message : "Operation failed",
      error : err


    });
  })






}

 function saveRandom(res,random) {
 

     random.save().then(() => {
       

      res.status(201).json({
        message : "Operation succeeded",
   
  
      });
  
    }
  
  
    ).catch(err => {
     
 
      res.status(500).json({
        message : "Operation failed",
        error : err
  
  
      });
    }
  
    );




   }

   function deleteRandom(res,id){


    RandomHash.deleteOne({ id: id }).then(() => {


     
      
        

     
    }).catch(err => {
    //  console.log(err)
      res.status(500).json({
        message : "Operation failed",
        error : err
  
  
      });




    });


   }