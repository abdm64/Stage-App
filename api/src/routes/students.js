 const express =require('express');
 const studentController = require('../Controller/StudentsController')
 const auth = require('./auth-check')








 const app = express.Router();









 

 




//fetch All student + adding pagination  ,auth ,auth

app.get('/api/v2/students/:type'  , studentController.getStudents)
//get student by id ,auth,

app.get('/api/v2/students/:type/:id',studentController.getStudentById)


//,auth

app.post('/api/v2/students/:type/add',auth, studentController.addStudent);


 //delete data by name in the by matrecule,auth
 app.delete('/api/v2/students/:type/delete/:id',studentController.deleteStudent)


 // update data

 app.put("/api/v2/students/:type/update/:matricule",auth,studentController.updateStudent);

//delete All data ,auth
app.delete("/api/v2/students/:type/delete" ,auth, studentController.deleteAllStudents);

    //get the number of document  to create matricule

    

  










module.exports = app;
