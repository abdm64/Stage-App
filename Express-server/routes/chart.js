


const express = require("express");
const auth = require('./auth-check');
const mongoose =require('mongoose');

const Students = mongoose.model( 'Students');


const app= express.Router();




app.get('/api/students/enc',auth,(req,res)=>{
    var arrayEnc = []
   
    Students.find().then(documents =>{
      for (docment of documents) {
          arrayEnc.push(docment.encadreur)
      }
  
      
      res.status(200).send(arrayEnc)
      
  });
  
  })
  
  app.get('/api/students/encSec',auth,(req,res)=>{
    var arraySec = []
   
    Students.find().then(documents =>{
      for (docment of documents) {
        arraySec.push(docment.encadreurSec)
      }
   res.status(200).send(arraySec)
   //console.log(arraySec)
      });
      }
  
    )
  
    //************************** chart date debut */
    app.get('/api/students/datedebut',auth,(req,res)=>{
      var arraySec = []
     
      Students.find().then(documents =>{
        for (docment of documents) {
          arraySec.push(docment.dateDebut)
        }
     res.status(200).send(arraySec)
     //console.log(arraySec)
        });
        }
    
      )
  
      //************************** chart date fin */
    app.get('/api/students/datefin',auth,(req,res)=>{
      var arraySec = []
     
      Students.find().then(documents =>{
        for (docment of documents) {
          arraySec.push(docment.dateFin)
        }
     res.status(200).send(arraySec)
     //console.log(arraySec)
        });
        }
    
      )

      module.exports = app;