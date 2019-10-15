 const express =require('express');

 const mongoose =require('mongoose');
 const bodyParser = require('body-parser');
 const cors = require('cors');




 const app = express.Router();

 //map global promise  -get rid of warning message
 mongoose.Promise = global.Promise;


 //connect to  mongoose




  mongoose.connect("mongodb://localhost/test",{
    useNewUrlParser: true,
    useUnifiedTopology: true
 })

  require('../models/Student');
 const Students = mongoose.model( 'Students');
 

 app.use(cors())




 //handlebars middleware
// app.engine('handlebars', exphbs({defaultLayout:'main'}));
 //app.set('view engine', 'handlebars');



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






app.get('/api/students/data',(req,res, next)=>{

  Students.find({}, {}, { sort: { _id :  -1} }, function(err, docs) {
    
      res.status(201).json({
        students : docs
      })
    
    
  });
})




    




app.post('/api/students/insertData',(req,res)=>{




  var  student = new Students(req.body)
  console.log(req.body)
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
 app.delete('/api/students/deleteData/:id',(req,res)=>{

    Students.deleteOne({ matricule: req.params.id }, function (err) {
        if (err) return handleError(err);
        // deleted at most one tank document
        res.status(200).send() ;
      });



 })

 // update data

 app.put("/api/students/update/:matricule",function (req,res) {

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
    
      res.json(post.matricule)
    
    
  });
})
app.get('/api/students/enc',(req,res)=>{
  var arrayEnc = []
 
  Students.find().then(documents =>{
    for (docment in documents) {
        arrayEnc.push(documents[docment].encadreur)
    }

    
    res.status(200).send(arrayEnc)
    
});

})

app.get('/api/students/encSec',(req,res)=>{
  var arraySec = []
 
  Students.find().then(documents =>{
    for (docment in documents) {
      arraySec.push(documents[docment].encadreurSec)
    }
 res.status(200).send(arraySec)
 //console.log(arraySec)
    });
    }

  )

  //************************** chart date debut */
  app.get('/api/students/datedebut',(req,res)=>{
    var arraySec = []
   
    Students.find().then(documents =>{
      for (docment in documents) {
        arraySec.push(documents[docment].dateDebut)
      }
   res.status(200).send(arraySec)
   //console.log(arraySec)
      });
      }
  
    )

    //************************** chart date fin */
  app.get('/api/students/datefin',(req,res)=>{
    var arraySec = []
   
    Students.find().then(documents =>{
      for (docment in documents) {
        arraySec.push(documents[docment].dateFin)
      }
   res.status(200).send(arraySec)
   //console.log(arraySec)
      });
      }
  
    )




module.exports = app;
