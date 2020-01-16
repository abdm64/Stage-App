import {Injectable, Input } from  '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './AuthData';
import {Router} from "@angular/router"
import { MsgErrorComponent} from "./msg-error/msg-error.component"
import { MatDialog } from '@angular/material';
import { Subject} from 'rxjs';
import { environment } from '../environments/environment';
// StudentService handel all networking related to student


const  BASE_URL = environment.apiUrl+'api';
@Injectable({providedIn :'root'})

export class AuthService {
  superusers = ["abdm64@live.com","Fatma.TILIOUINE@DJEZZY.DZ"]
  
  token = ""
  name:Subject<string> = new Subject()
    constructor(private http: HttpClient ,private router: Router,public dialog: MatDialog){


    }

    isLooged : Boolean = false ;



createUser(email : string, password: string){
    const authData : AuthData = {
        email: email, password : password
    }


    this.http.post(BASE_URL+'/user/sign', authData).subscribe(res => {

    
      this.router.navigate(['login']);


    } ,  err => {

      console.log(err.message) ;

      this.openErrorMessage("Error","Please try again")

    });





}
login(email : string, password: string){
  
    const authData : AuthData = {
        email: email, password : password
    }

    this.http.post<{token : string}>(BASE_URL+'/user/login', authData).subscribe(response => {





         this.name.next(authData.email)
         localStorage.setItem("user",authData.email)

         if ( this.superusers.includes(authData.email)) {
          this.router.navigate(['suivi']);
        }else {

          this.router.navigate(['insert']);
        }

           

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
