import {Students} from '../../models/Student';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({providedIn :'root'})

export class  StudentService{
   baseUrlLocal = "http://localhost";
 baseUrlProd = "http://172.16.60.34"
  result : string = '#' ;

    private students  : Students[] ;

    private  studentUpdated = new  Subject<Students[]>();

    constructor(private http:HttpClient){

    }

    async getStudents(){
       // return [...this.students];          copy of array not original
       // return this.students;     //mais observables mieux
       //                   msg!!!!!!!!!!!!!!!

      this.http.get<{students:Students[]}>(this.baseUrlLocal+':3000/api/students/data').
      subscribe((postData)=>{
          this.students = postData.students;
          this.studentUpdated.next([...this.students]);

      });

    }





    getStudentUpdateListener(){
        return this.studentUpdated.asObservable();
    }
    addStudent(data: any){


   this.http.post(this.baseUrlLocal+':3000/api/students/insertData', data).
        subscribe(respanse => {
          this.result = "is ready to go" ;
          console.log(respanse)
        }, error => {
          this.result  = error.message ;

        });

   this.students.push(data);
   this.studentUpdated.next([...this.students]);

    }

    deleteStudent(matricule : Number){
      this.http.delete(this.baseUrlLocal+':3000/api/students/deleteData/'+matricule).subscribe((val) => {
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
      this.http.put(this.baseUrlLocal+':3000/api/students/update/'+matricule, data).subscribe(
        data  => {

          console.log("PUT Request is successful ", data);

          },

          error  => {

          console.log("error", error, data);

          }
      )


    }


}//class
