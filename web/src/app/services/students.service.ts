//import {Students} from '../../../models/Student';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { MsgErrorComponent} from "../pages/msg-error/msg-error.component"
import { MatDialog } from '@angular/material';
import { Router} from '@angular/router';
import { environment } from '../../environments/environment';
import { Student } from '../models/Student.model'
// StudentService handel all networking related to student


const  BASE_URL = environment.apiUrl+'api/v2';
const random = environment.random;



@Injectable({providedIn :'root'})

// StudentService handel all networking related to students


export class  StudentService {



  result : string = '#' ;
  type : string
  urlType : string
  

    private students  : Student[] ;
    maxNumber : number
    superusers = ["abdm64@live.com","Fatma.TILIOUINE@DJEZZY.DZ","Kamel.Naitdjoudi@DJEZZY.DZ","Farah.ASSOUL@DJEZZY.DZ","Sihem.Mouci@DJEZZY.DZ","Adnane.Zeribi@DJEZZY.DZ"]


    private  studentUpdated = new  Subject<any[]>();



    constructor(private http:HttpClient, private dialog: MatDialog, private router : Router){
      const type = localStorage.getItem('type') || '0'
      this.urlType = `/students/${type}/`
    }
    setHeader(){

      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      headers = headers.set('authorization', 'Bearer ' + localStorage.getItem("token"));
      return headers
    }


    getStudent(pageSize : number, pageIndex : number){

      const queryParms = `?pageSize=${pageSize}&pageIndex=${pageIndex}`
      
      this.http.get<{students:any[],maxNumber : number}>(BASE_URL+this.urlType+queryParms,  { headers: this.setHeader() }).
      subscribe((postData)=>{

        this.maxNumber = postData.maxNumber


          this.students = postData.students;
          this.studentUpdated.next([...this.students]);


      });
    }
     getStudentSearch(term : string){

      const queryParms = `?search=${term}`

     return this.http.get<{students:any[],maxNumber : number}>(BASE_URL+this.urlType+queryParms,  { headers: this.setHeader() })


    }

    sendEvaluation(data : any, studentName : string,id :number){

      this.http.post(BASE_URL+'/evaluation/'+id, data,{ headers: this.setHeader() }).
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

      this.http.post(BASE_URL+'/random', data,{ headers: this.setHeader() }).
      subscribe(respanse => {


      }, error => {

       console.log(error)


      });
    }


getSuperUser(){

  return    ["abdm64@live.com","Fatma.TILIOUINE@DJEZZY.DZ","Kamel.Naitdjoudi@DJEZZY.DZ","Farah.ASSOUL@DJEZZY.DZ","Sihem.Mouci@DJEZZY.DZ","Adnane.Zeribi@DJEZZY.DZ"]
}



    getStudentUpdateListener(){
        return this.studentUpdated.asObservable();
    }
    addStudent(data: any){
      const user = data.user


   this.http.post(BASE_URL+this.urlType+'add', data,{ headers: this.setHeader() }).
        subscribe(respanse => {
          console.log(respanse)
          this.studentUpdated.next([this.students]);
          //check if token exist
          if (!this.superusers.includes(user)) {

            this.openMessage("succeed", "Operation succeeded",false,true)

          } else {
            this.router.navigate(['suivi'])
          }


        }, error => {
        console.log(error)
          const message = error.error.message ;
         this.openMessage("ERR", message,false,true)

        });



    }

    deleteStudent(matricules : Number){
      this.http.delete(BASE_URL+this.urlType+'delete/'+matricules,{ headers: this.setHeader() }).subscribe((val) => {
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
      this.http.delete(BASE_URL+'/random/'+id,{ headers: this.setHeader() }).subscribe((val) => {

        console.log(val)

    },
    error => {
        console.log("DELETE call in error", error);



    })

    }

    updateStudent(matricule : Number,dataOne : Student){

      this.http.put(BASE_URL+this.urlType+'update/'+matricule, dataOne,{ headers: this.setHeader() }).subscribe(
        (data: Student )  => {

          // console.log("PUT Request is successful ", data);
          this.students.forEach((t, i) => {
            if (t.matricule === matricule) { this.students[i] = data; }
          });

          this.studentUpdated.next([...this.students]);

          },

          error  => {

           console.log("error", error);

          }
      )



    }





    getEncadreur(mat : number){

      return this.http.get(BASE_URL+`/encadreur/data/`+mat,  { headers: this.setHeader() })


       }
    async getstudentEvaluation(mat : number){
      // try fetch data with native javascript fetch
        const res = await fetch(BASE_URL+`/evaluation/`+mat)
        const data = await res.json()
        return data
    }
    getSudentById(id : number){

      return this.http.get(BASE_URL+this.urlType+'data/'+id,  { headers: this.setHeader() })





    }


  getEvaMatricule(){
    return this.http.get<number[]>(BASE_URL+'/matricule',  { headers: this.setHeader()})

  }
async getUrl(id: number){

  //return this.http.get<{ : number[]}>(this.baseUrlLocal+'/random/'+id,  { headers: this.setHeader()})
  const res  =  await fetch(BASE_URL+`/random/`+id)
  const data = await res.json()


  return data
}



setType(type : string){


      this.type = type
}

getType() : string {

  return this.type
}




///////////////////////

//Make Multi Alerts
openMessage(title : String,message : String, so : boolean ,err : boolean): void {

  const dialogRef = this.dialog.open(MsgErrorComponent, {
    width: '20%',
    data : {

      message : message,
      title : title

    }

  });


  dialogRef.afterClosed().subscribe(result => {


console.log(result)
if (so === true && err === false) {
window.location.href = '/thank'

}



  });
}


selectSide(side) {
  //`your Evaluation for ${ studentName} is submited Have a nice Day`

  return this.http.get(BASE_URL+`?archive=${side}&token=${random}`)
  .subscribe((res) => {
    //console.log(res)
  });
}



}//class
