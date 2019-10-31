import {Students} from '../../models/Student';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { MsgErrorComponent} from "./msg-error/msg-error.component"
import { MatDialog } from '@angular/material';



@Injectable({providedIn :'root'})

export class  StudentService{
   baseUrlLocalp = "http://localhost:3000/api";
   baseUrlLocal = "http://172.16.60.34:3000/api"

  result : string = '#' ;

    private students  : Students[] ;


    private  studentUpdated = new  Subject<Students[]>();

   // private _refreshNeeded$ = new Subject<void>();



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
          this.students.push(data);
          this.studentUpdated.next([this.students]);
          this.openMessage("succeeded","operation succeeded")
        }, error => {
          this.result  = error.message ;
         this.openMessage("Error","Operation Failed")

        });



    }

    deleteStudent(matricules : Number){
      this.http.delete(this.baseUrlLocal+'/students/deleteData/'+matricules,{ headers: this.setHeader() }).subscribe((val) => {
        this.students.forEach((t, i) => {
          if (t.matricule === matricules) {   this.students.splice(i,  1); }


        });

        this.studentUpdated.next([...this.students]);


    },
    error => {
        console.log("DELETE call in error", error);



    })

    }

    updateStudent(matricule : Number,dataOne : any){
      this.http.put(this.baseUrlLocal+'/students/update/'+matricule, dataOne,{ headers: this.setHeader() }).subscribe(
        data  => {

          console.log("PUT Request is successful ", data);
          this.students.forEach((t, i) => {
            if (t.matricule === matricule) { this.students[i] = data; }
          });

          this.studentUpdated.next([...this.students]);

          },

          error  => {

          console.log("error", error, dataOne);

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
