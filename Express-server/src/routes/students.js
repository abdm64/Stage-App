 const express =require('express');
 const studentController = require('../Controller/StudentsController')
 const auth = require('./auth-check')








 const app = express.Router();









 

 



app.get('/api', (req,res, next)=>{


 
    
    
  res.send("API is working ")
})

//fetch All student + adding pagination  ,auth

app.get('/api/students/data' , studentController.getStudents)



app.post('/api/students/insertData',auth,studentController.addStudent);


 //delete data by name in the by matrecule
 app.delete('/api/students/deleteData/:id',auth,studentController.deleteStudent)

 // update data

 app.put("/api/students/update/:matricule",auth,studentController.updateStudent);

//delete All data
app.delete("/api/students/delete",auth, studentController.deleteAllStudents);

    //get the number of document  to create matricule

    app.get('/api/students/number', studentController.getLastmatriculeStudent)

  app.get('/api/students/numberEnd', studentController.getTheNumberStudents)










module.exports = app;
