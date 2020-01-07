import {Students} from '../../models/Student';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { MsgErrorComponent} from "./msg-error/msg-error.component"
import { MatDialog } from '@angular/material';
import { Router} from '@angular/router';



@Injectable({providedIn :'root'})

export class  StudentService{
   baseUrlLocal = "http://localhost:3000/api";
   baseUrlLocalp = "http://172.16.60.36:3000/api"
   baseUrlLocalk = "http://172.16.60.36:31515/api"

  result : string = '#' ;

    private students  : any[] ;
    maxNumber : number


    private  studentUpdated = new  Subject<Students[]>();

   // private _refreshNeeded$ = new Subject<void>();



    constructor(private http:HttpClient, public dialog: MatDialog, public router : Router){

    }
    setHeader(){

      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      headers = headers.set('authorization', 'Bearer ' + localStorage.getItem("token"));
      return headers
    }

    async getStudents(){

    //  const queryParms = `?pageSize=${pageSize}&pageIndex=${pageIndex}`
      this.http.get<{students:Students[]}>(this.baseUrlLocal+'/students/data',  { headers: this.setHeader() }).
      subscribe((postData)=>{
          this.students = postData.students;
          this.studentUpdated.next([...this.students]);


      });

    }
    async getStudent(pageSize : number, pageIndex : number){

      const queryParms = `?pageSize=${pageSize}&pageIndex=${pageIndex}`
      this.http.get<{students:Students[],maxNumber : number}>(this.baseUrlLocal+'/students/data'+queryParms,  { headers: this.setHeader() }).
      subscribe((postData)=>{

        this.maxNumber = postData.maxNumber


          this.students = postData.students;
          this.studentUpdated.next([...this.students]);


      });

    }
    async getStudentSearch(term : string){

      const queryParms = `?search=${term}`

      this.http.get<{students:Students[],maxNumber : number}>(this.baseUrlLocal+'/students/data'+queryParms,  { headers: this.setHeader() }).
      subscribe((postData)=>{

          this.maxNumber = postData.maxNumber
          this.students = postData.students;
          this.studentUpdated.next([...this.students]);



      });

    }

    sendEvaluation(data : any, studentName : string,id :number){

      this.http.post(this.baseUrlLocal+'/evaluation/'+id, data,{ headers: this.setHeader() }).
      subscribe(respanse => {
        this.destroyUrl(id)
        this.openMessage("Thank You ", `your Evaluation for ${ studentName} is submited Have a nice Day`, true,false )
      }, error => {
       console.log(error)
        const message = error.error.message ;
       this.openMessage("ERR", message, true,true)

      });
    }

    saveRandomHash(data : any){

      this.http.post(this.baseUrlLocal+'/random', data,{ headers: this.setHeader() }).
      subscribe(respanse => {


      }, error => {

       console.log(error)


      });
    }






    getStudentUpdateListener(){
        return this.studentUpdated.asObservable();
    }
    addStudent(data: any){


   this.http.post(this.baseUrlLocal+'/students/insertData', data,{ headers: this.setHeader() }).
        subscribe(respanse => {
          this.studentUpdated.next([this.students]);
          this.router.navigate(['suivi'])
        }, error => {
         // console.log(error.error.message)
          const message = error.error.message ;
         this.openMessage("ERR", message,false,true)

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

    destroyUrl(id: number){
      this.http.delete(this.baseUrlLocal+'/random/'+id,{ headers: this.setHeader() }).subscribe((val) => {

        console.log(val)

    },
    error => {
        console.log("DELETE call in error", error);



    })

    }

    updateStudent(matricule : Number,dataOne : any){
      this.http.put(this.baseUrlLocal+'/students/update/'+matricule, dataOne,{ headers: this.setHeader() }).subscribe(
        data  => {

          // console.log("PUT Request is successful ", data);
          this.students.forEach((t, i) => {
            if (t.matricule === matricule) { this.students[i] = data; }
          });

          this.studentUpdated.next([...this.students]);

          },

          error  => {

          // console.log("error", error, dataOne);

          }
      )



    }

    openMessage(title : String,message : String, so : boolean ,err : boolean): void {
      //console.log(data)
      const dialogRef = this.dialog.open(MsgErrorComponent, {
        width: '20%',
        data : {

          message : message,
          title : title

        }

      });


      dialogRef.afterClosed().subscribe(result => {


//console.log("close it ")
if (so === true && err === false) {
  window.location.href = '/thank'

}



      });
    }

  async getStudentNumber(){



const res  =  await fetch( this.baseUrlLocal+`/students/number`)
const data = await res.json()


return parseInt(data)



    }
    async getstudentEvaluation(mat : number){
        const res = await fetch(this.baseUrlLocal+`/evaluation/`+mat)
        const data = await res.json()



        return data
    }
    async getSudentById(id : number){

      const res = await fetch(this.baseUrlLocal+`/students/data/`+id)
      const data = await res.json()



      return data



    }

  async getMatricule(){

    const res  =  await fetch( this.baseUrlLocal+`/students/numberEnd`)
    const data = await res.json()
    var  num : number = 0

    if (data === null ) {
      num = 1
      } else {

       num = data.matricule + 1
      }



         return num


  }
  async getEvaMatricule(){
    const res  =  await fetch(this.baseUrlLocal+`/matricule`)
    const data = await res.json()


    return data
  }
async getUrl(id: number){

  const res  =  await fetch(this.baseUrlLocal+`/random/`+id)
  const data = await res.json()


  return data
}

}//class
