

const express = require("express");
const mongoose =require('mongoose');
const Students = mongoose.model( 'Students');
const app = express();


console.log("time Machine is here ")




app.get('/api/students', (req,res, next)=>{
    const timeMachine = req.query.end
    console.log(timeMachine)
 
    Students.find({}, {}, { sort: { _id :  -1} }).then(students => {
      
      
studentTimeMachine(res,students,timeMachine)
     

    })
   
  
  });














function studentTimeMachine(res,students,timeMachine){
    var studentsEnd = []
    var studentsStill = []

    for (student of students){
        if (!getStudentDate(student)){
         studentsEnd.push(student)
     
        } else if (getStudentDate(student)) {
         studentsStill.push(student)
        console.log(student)
         
         
        }
        
     }


     if (timeMachine === 'true'){
         res.send(studentsEnd)
     } else if(timeMachine == 'false') {

         res.send(studentsStill)
     }



}






function getStudentDate(student) {

    const d1 = new Date(Date.now())
    const d2 = new Date(student.dateFin)
  
   const same = d1.getTime() - d2.getTime() ;
  
    var days = (same / (60*60*24*1000));
  
   return days < 0
  
   }

   module.exports = app;
