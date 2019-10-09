import {Students} from '../../models/Student';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { response } from 'express';

@Injectable({providedIn :'root'})
export class  StudentService{
  result : string = '#' ;

    private students  : Students[] ;

    private  studentUpdated = new  Subject<Students[]>();

    constructor(private http:HttpClient){

    }

    getStudents(){ 
       // return [...this.students];          copy of array not original
       // return this.students;     //mais observables mieux
       //                   msg!!!!!!!!!!!!!!!
     if (this.students) {
       return this.students;
     } else {
      this.http.get<{students:Students[]}>('http://localhost:3000/api/students/data').
      subscribe((postData)=>{
          this.students = postData.students;
          this.studentUpdated.next([...this.students]);

      });
     }
    }





    getStudentUpdateListener(){
        return this.studentUpdated.asObservable();
    }
    addStudent(data: any){


   this.http.post('http://localhost:3000/api/students/insertData', data).
        subscribe(respanse => {
          this.result = "is ready to go" ;
        }, error => {
          this.result  = error.message ;

        });

   this.students.push(data);
   this.studentUpdated.next([...this.students]);

    }

    deleteStudent(matricule : Number){
      this.http.delete('http://localhost:3000/api/students/deleteData/'+matricule).subscribe((val) => {
        console.log("DELETE call successful value returned in body",
                    val);
    },
    response => {
        console.log("DELETE call in error", response);
    },
    () => {
        console.log("The DELETE observable is now completed.");
    });

    }

    updateStudent(matricule : Number,data : any){
      this.http.put('http://localhost:3000/api/students/update/'+matricule, data).subscribe(
        data  => {

          console.log("PUT Request is successful ", data);

          },

          error  => {

          console.log("error", error, data);

          }
      )


    }


}//class
