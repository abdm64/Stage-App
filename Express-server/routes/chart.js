
const express = require("express");
const auth = require('./auth-check');
const mongoose =require('mongoose');

const Students = mongoose.model( 'Students');


const app= express.Router();


// ,auth

app.get('/api/students/enc',auth,(req,res)=>{
    var arrayEnc = []
    
   
    Students.find().then(documents =>{
      for (docment of documents) {
          arrayEnc.push(docment.encadreurDEP)
      }
      
  

      
      res.status(200).send(getElemnt(arrayEnc))
      
  });
  
  })
  
  app.get('/api/students/encSec',auth,(req,res)=>{
    var arraySec = []
   
    Students.find().then(documents =>{
      for (docment of documents) {
        arraySec.push(docment.encadreurSec)
      }
   res.status(200).send(getElemnt(arraySec))
   //console.log(arraySec)
      });
      }
  
    )

    
  
    //************************** chart date debut ,auth */

    app.get('/api/students/datedebut',auth,(req,res)=>{
      var arraySec = []
      const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

     
      Students.find().then(documents =>{
        for (docment of documents) {
          let month = monthNames[docment.dateDebut.getMonth()]
          arraySec.push(month)
        }
     res.status(200).send(sendDataDate(getElemnt(arraySec.sort())))
    
        });
        }
    
      )
  
      //************************** chart date fin ,auth */
    app.get('/api/students/datefin',auth,(req,res)=>{
      var arraySec = []
      const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

     
      Students.find().then(documents =>{
        for (docment of documents) {
          
          let month = monthNames[docment.dateFin.getMonth()]
          arraySec.push(month)
        }
      
      
        
         

     res.status(200).send(sendDataDate(getElemnt(arraySec.sort())))
    
        });
        }
    
      )



      function getElemnt(arr){
        const chars = {}

        for (let char of arr ) {
          if ( !chars[char]) {
              chars[char] = 1
          } else {
     
             chars[char]++
     
          }
     
        
     }

     
      return chars

      }

      function sendDataDate(data){




        const obj = {


          January : data.January ||  0,
          February : data.February  || 0,
          March : data.March || 0,
          April:   data.April || 0,
          May: data.May || 0,
          Jun: data.Jun || 0,
          July: data.July || 0,
          August:data.August || 0,
          September: data.September || 0,
          October: data.October || 0,
          November:  data.November  || 0,
          December: data.December || 0,

        
        }
        console.log(obj.January)

        return obj
      }


      module.exports = app;