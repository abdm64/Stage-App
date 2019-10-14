import {Injectable } from  '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './AuthData';
import {Router} from "@angular/router"







@Injectable({providedIn :'root'})

export class AuthService {
  baseUrlLocal = "http://localhost";
 baseUrlProd = "http://172.16.60.34"
    constructor(private http: HttpClient ,private router: Router){}
    private token : string;
    public isLooged : false ;

    getToken(){
        return this.token
    }
    setLogging(value : Boolean){



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


    }, error => {

      console.log(error.message) ;

    });





}




}
