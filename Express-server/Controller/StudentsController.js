const mongoose =require('mongoose');
require('../models/Student');
const Students = mongoose.model( 'Students');




exports.getStudents =  (req,res, next)=>{
  
    const pageSize = +req.query.pageSize
    const pageIndex = +req.query.pageIndex
    const search = req.query.search
    
    const studentQuary =  Students.find({}, {}, { sort: { _id :  -1} }) ;
  
  
    if( pageSize && pageIndex){
    
  
      
      studentQuary.skip(pageSize * (pageIndex - 1)).limit(pageSize).then((docs,err) => {
  
        if (err) return handleError(err)
  
        students = docs
  
  
    return Students.count()
  
  })   
  .then(count => {
    res.status(200).json({
      message: "Students fetched successfully!",
      students: students,
      maxNumber: count
    });    
      })
  
    } else 
    if ((search)) {
      //console.log(search)
      const regex = new RegExp(escapeRegex(search),'ig');
          Students.find({$or: [
            {nom: regex}, 
            {prenom: regex}, 
            {matricule:checkIfNumber(search)}
          ]}, (err, docs)=>{
            if (err) handleError(err);
            res.status(201).json({
              students : docs,
              maxNumber : docs.length
  
  
            })
            
             
          });
    } else{
  
  
  
  
  
  
  studentQuary.then((docs,err) => {
  
    if (err) return handleError(err)
  
    students = docs
  
    return Students.count()
  })   
  .then(count => {
    res.status(200).json({
      message: "Students fetched successfully!",
      posts: students,
      maxNumber: count
    });
  
  
  });
  
  
  
  }
  
  
  
   
  }
//Add Data


  exports.addStudent = (req,res,next)=>{
    var  student = new Students(req.body)
    const nom = req.body.nom
    const prenom = req.body.prenom



 

 Students.findOne({nom : nom, prenom : prenom}, (err, docs) => {
  if (err) handleError(err);


if (!docs){      
 
        addStudent(res,student)
  
} else{

  res.status(500).json({
    message : "User Already Exist",
    error : err


  });
}
})

  
   
     
    





  
  
  
  
  }

  exports.deleteStudent = (req,res)=>{

    Students.deleteOne({ matricule: req.params.id }, (err)  => {
        if (err) return handleError(err);
        
        res.status(200).send() ;
      });



 }

 exports.updateStudent = (req,res) => {

    Students.findOneAndUpdate( {matricule : req.params.matricule} , req.body , {new: true} ,
 
     (err, docs) => {
         // Handle any possible database errors
 
             if (err) return res.status(500).send(err);
             return res.send(docs);
         }
     )
 
   }

   exports.deleteAllStudents = (req,res) => {

    Students.deleteMany( function (err) {
     if (err) return handleError(err), res.send(err);
     // deleted at most one tank document
     res.status(200).send("students deleted") ;
   });
 
    }

    exports.getLastmatriculeStudent = (req,res)=>{



        Students.find().count(function(err, count){
            if (err) return res.send(err);
            res.json(count);
        });
  
    }

    exports.getTheNumberStudents = (req,res)=>{

        Students.findOne({}, {}, { sort: { _id :  -1} }, function(err, post) {
          
      
          if (err) return res.send(err);
      
          
            res.json(post)
          
          
        });
      }

      function escapeRegex(text) {

        if (text === undefined || text === null) {
         
      } else {
      
      
      
        
      
      
        if (isNaN(text)){
          //is not nember
      
           return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&").toLowerCase();
      
        } else {
      
          //is number
      
          return +text
        }
          
      };
      
      
      
      
      
      }
      
      
      function checkIfNumber(input){
        if (isNaN(input)){
          //is not nember
      
           return 0
      
        } else {
      
          //is number
      
          return +input
        }
      
      }


function addStudent(res,student){
  student.save().then(result => {
    res.status(201).json({
      message : "Operation succeeded",
      result: result

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
   
