import {Injectable, Input } from  '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './AuthData';

import {Router} from "@angular/router"
import { MsgErrorComponent} from "./msg-error/msg-error.component"
import { MatDialog } from '@angular/material';

import { Subject} from 'rxjs';










@Injectable({providedIn :'root'})

export class AuthService {
  baseUrlLocal = "http://localhost:3000/api";
  baseUrlLocalp = "http://172.16.60.36:3000/api"
  token = ""
  name:Subject<string> = new Subject()
    constructor(private http: HttpClient ,private router: Router,public dialog: MatDialog){


    }

    isLooged : Boolean = false ;



createUser(email : string, password: string){
    const authData : AuthData = {
        email: email, password : password
    }


    this.http.post(this.baseUrlLocal+'/user/sign', authData).subscribe(res => {

      console.log(res)
      this.router.navigate(['suivi']);


    } ,  err => {

      console.log(err.message) ;

      this.openErrorMessage("Error","Please try again")

    });





}
login(email : string, password: string){
    const authData : AuthData = {
        email: email, password : password
    }

    this.http.post<{token : string}>(this.baseUrlLocal+'/user/login', authData).subscribe(response => {





         this.name.next(authData.email)
         localStorage.setItem("user",authData.email)

            this.router.navigate(['suivi']);

            localStorage.setItem("auth",'true')

            localStorage.setItem("token",response.token)
              this.isLooged = true,

            this.token = response.token


    }, error => {

      console.log(error.message) ;

      this.openErrorMessage("Error","Please confirm the email and the password")

    });






}
getIsLooged(){
console.log(this.isLooged)
  return this.isLooged
}


openErrorMessage(title : String, message : String): void {
  //console.log(data)
  const dialogRef = this.dialog.open(MsgErrorComponent, {
    width: '20%',
    data : { title : title,
      message : message

    }

  });


  dialogRef.afterClosed().subscribe(result => {


  });

}




}//class
