 const express =require('express');
 const studentController = require('../Controller/StudentsController')
 const auth = require('../middleware/auth-check')
 const router = express.Router();









 

 




//fetch All student + adding pagination  ,auth ,auth

router.get('/api/v2/students/:type'  , studentController.getStudents)
//get student by id ,auth,

router.get('/api/v2/students/:type/:id',studentController.getStudentById)


//,auth

router.post('/api/v2/students/:type/add',auth, studentController.addStudent);


 //delete data by name in the by matrecule,auth
 router.delete('/api/v2/students/:type/delete/:id',studentController.deleteStudent)


 // update data

 router.put("/api/v2/students/:type/update/:matricule",auth,studentController.updateStudent);

//delete All data ,auth
router.delete("/api/v2/students/:type/delete" ,auth, studentController.deleteAllStudents);

    //get the number of document  to create matricule

    

  










module.exports = router;
