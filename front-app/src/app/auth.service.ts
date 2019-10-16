import {Injectable } from  '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './AuthData';
import {Router} from "@angular/router"







@Injectable({providedIn :'root'})

export class AuthService {
  baseUrlLocal = "http://localhost";
  token = ""
    constructor(private http: HttpClient ,private router: Router){}

    public isLooged : false ;

    getToken(){
        return this.token
    }

    get isLoged (){


        return this.isLooged
    }

createUser(email : string, password: string){
    const authData : AuthData = {
        email: email, password : password
    }

    this.http.post(this.baseUrlLocal+':3000/api/user/sign', authData).subscribe(response => {

    console.log(response);
    })




}
login(email : string, password: string){
    const authData : AuthData = {
        email: email, password : password
    }

    this.http.post<{token : string}>(this.baseUrlLocal+':3000/api/user/login', authData).subscribe(response => {
            this.router.navigate(['suivi'])
            localStorage.setItem("auth",'true')
            localStorage.setItem("user",authData.email)
            localStorage.setItem("token",response.token)
            this.token = response.token


    }, error => {

      console.log(error.message) ;

    });





}




}
