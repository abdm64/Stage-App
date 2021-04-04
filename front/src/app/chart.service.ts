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




  async getEncadreur(year : number){



 const data =  await this.http.get(BASE_URL+'/students/enc?year='+year,   { headers: this.setHeader() }).toPromise();


return data
}


async getEncadreurSec(year:number){

  let  data =await  this.http.get(BASE_URL+'/students/encSec?year='+year,  { headers: this.setHeader() }).toPromise();


 return data
 }


 async getDateDebut(year){

  var  data  =await  this.http.get(BASE_URL+'/students/datedebut?year='+year, { headers: this.setHeader() }).toPromise();




 return data
 }

 async getDateFin(year){

  var  data  =await  this.http.get(BASE_URL+'/students/datefin?year='+year,  { headers: this.setHeader() }).toPromise();



 return data
 }
 async getTypes(year){

  var  data  =await  this.http.get(BASE_URL+'/students/types?year='+year,  { headers: this.setHeader() }).toPromise();



 return data
 }





}
