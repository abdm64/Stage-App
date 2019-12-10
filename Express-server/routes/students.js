 const express =require('express');

 const mongoose =require('mongoose');
 const bodyParser = require('body-parser');
 const cors = require('cors');
 const auth = require('./auth-check')




 const app = express.Router();

 //map global promise  -get rid of warning message
 mongoose.Promise = global.Promise;






  require('../models/Student');
 const Students = mongoose.model( 'Students');
 

 app.use(cors())
 







//how middleware works
/***********************************/
app.use(function(req,res,next){
    //console.log(Date.now());
    //req.name='safaa';
    res.setHeader("Access-Control-Allow-Origin" ,"*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type , Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET ,POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
/************************************/



// body parse middleware
app.use(bodyParser.urlencoded({ extended: false }))
// parsejson
app.use(bodyParser.json())



app.get('/api', (req,res, next)=>{


 
    
    
  res.send("API is working ")
})

//fetch All student + adding pagination  ,auth

app.get('/api/students/data' , (req,res, next)=>{
  
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
    
    

    const regex = new RegExp(escapeRegex(search),'ig');


  


   
      
        Students.find({$or: [
          {nom: regex}, 
          {prenom: regex}, 
          {matricule:checkIfNumber(search)}
        ]}, (err, docs)=>{
          if (err) handleError(err);
          

          res.status(201).json({
            students : docs


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



 
})



///



    




app.post('/api/students/insertData',auth,(req,res)=>{




  var  student = new Students(req.body)
  //console.log(req.body)
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



});







 //delete data by name in the by matrecule
 app.delete('/api/students/deleteData/:id',auth,(req,res)=>{

    Students.deleteOne({ matricule: req.params.id }, function (err) {
        if (err) return handleError(err);
        // deleted at most one tank document
        res.status(200).send() ;
      });



 })

 // update data

 app.put("/api/students/update/:matricule",auth,function (req,res) {

   Students.findOneAndUpdate( {matricule : req.params.matricule} , req.body , {new: true} ,

    (err, docs) => {
        // Handle any possible database errors

            if (err) return res.status(500).send(err);
            return res.send(docs);
        }
    )

  });

//delete All data
app.delete("/api/students/delete",function (req,res) {

   Students.deleteMany( function (err) {
    if (err) return handleError(err), res.send(err);
    // deleted at most one tank document
    res.status(200).send() ;
  });

   });

    //get the number of document  to create matricule

    app.get('/api/students/number',(req,res)=>{



      Students.find().count(function(err, count){
          if (err) return res.send(err);
          res.json(count);
      });

  })

  app.get('/api/students/numberEnd',(req,res)=>{

  Students.findOne({}, {}, { sort: { _id :  -1} }, function(err, post) {
    

    if (err) return res.send(err);

    
      res.json(post)
    
    
  });
})








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


module.exports = app;
