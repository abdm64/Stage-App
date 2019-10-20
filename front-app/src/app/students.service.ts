import {Students} from '../../models/Student';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MsgErrorComponent} from "./msg-error/msg-error.component"
import { MatDialog } from '@angular/material';



@Injectable({providedIn :'root'})

export class  StudentService{
   baseUrlLocal = "http://localhost:3000/api";
   baseUrlLocalp = "http://172.16.60.34:3000/api"

  result : string = '#' ;

    private students  : Students[] ;


    private  studentUpdated = new  Subject<Students[]>();

    constructor(private http:HttpClient, public dialog: MatDialog){

    }
    setHeader(){

      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      headers = headers.set('authorization', 'Bearer ' + localStorage.getItem("token"));
      return headers
    }

    async getStudents(){






      this.http.get<{students:Students[]}>(this.baseUrlLocal+'/students/data',  { headers: this.setHeader() }).
      subscribe((postData)=>{
          this.students = postData.students;
          this.studentUpdated.next([...this.students]);


      });

    }





    getStudentUpdateListener(){
        return this.studentUpdated.asObservable();
    }
    addStudent(data: any){


   this.http.post(this.baseUrlLocal+'/students/insertData', data,{ headers: this.setHeader() }).
        subscribe(respanse => {
          this.result = "is ready to go" ;
          //console.log(respanse)
          this.openMessage("succeeded","operation succeeded")
        }, error => {
          this.result  = error.message ;
         this.openMessage("Error","Operation Failed")

        });

   this.students.push(data);
   this.studentUpdated.next([...this.students]);

    }

    deleteStudent(matricule : Number){
      this.http.delete(this.baseUrlLocal+'/students/deleteData/'+matricule,{ headers: this.setHeader() }).subscribe((val) => {
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
      this.http.put(this.baseUrlLocal+'/students/update/'+matricule, data,{ headers: this.setHeader() }).subscribe(
        data  => {

          console.log("PUT Request is successful ", data);

          },

          error  => {

          console.log("error", error, data);

          }
      )


    }

    openMessage(title : String,message : String): void {
      //console.log(data)
      const dialogRef = this.dialog.open(MsgErrorComponent, {
        width: '20%',
        data : {
          message : message,
          title : title
        }

      });


      dialogRef.afterClosed().subscribe(result => {


      });
    }



}//class
