import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

const  BASE_URL = environment.apiUrl + 'api';





@Injectable({providedIn :'root'})
//StudentService handel all networking related to dashboard

export class ChartService  {



  constructor(private http:HttpClient) { }

  setHeader(){

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('authorization', 'Bearer ' + localStorage.getItem("token"));
    return headers
  }




  async getEncadreur(){



 const data =  await this.http.get(BASE_URL+'/students/enc',   { headers: this.setHeader() }).toPromise();


return data
}


async getEncadreurSec(){

  let  data =await  this.http.get(BASE_URL+'/students/encSec',  { headers: this.setHeader() }).toPromise();


 return data
 }


 async getDateDebut(){

  var  data  =await  this.http.get(BASE_URL+'/students/datedebut', { headers: this.setHeader() }).toPromise();




 return data
 }

 async getDateFin(){

  var  data  =await  this.http.get(BASE_URL+'/students/datefin',  { headers: this.setHeader() }).toPromise();



 return data
 }
 async getTypes(){

  var  data  =await  this.http.get(BASE_URL+'/students/types',  { headers: this.setHeader() }).toPromise();



 return data
 }





}
