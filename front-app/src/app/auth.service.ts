import {Injectable, Input } from  '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './AuthData';
import { ConstService} from './ConstData'
import {Router} from "@angular/router"
import { MsgErrorComponent} from "./msg-error/msg-error.component"
import { MatDialog } from '@angular/material';










@Injectable({providedIn :'root'})

export class AuthService {
  baseUrlLocalp = "http://localhost:3000/api";
  baseUrlLocal = "http://172.16.60.36:3000/api"
  token = ""
    constructor(private http: HttpClient ,private router: Router,public dialog: MatDialog){}

    isLooged : Boolean = false ;



createUser(email : string, password: string){
    const authData : AuthData = {
        email: email, password : password
    }


    this.http.post(this.baseUrlLocal+'/user/sign', authData).subscribe(response => {

    })




}
login(email : string, password: string){
    const authData : AuthData = {
        email: email, password : password
    }

    this.http.post<{token : string}>(this.baseUrlLocal+'/user/login', authData).subscribe(response => {


      const constData : ConstService = {
            user : authData.email

      }
            this.router.navigate(['suivi'])

            localStorage.setItem("auth",'true')
            localStorage.setItem("user",authData.email)
            localStorage.setItem("token",response.token)
              this.isLooged = true,

            this.token = response.token


    }, error => {

      console.log(error.message) ;
    //  alert("Please confirm the email or password ")
      this.openErrorMessage("Error","Please confirm the email or the password")

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
