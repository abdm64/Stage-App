import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe} from '@angular/common';





@Injectable({providedIn :'root'})

export class ChartService  {

  baseUrlLocalp = "http://localhost:3000/api/";
  baseUrlLocal = "http://172.16.60.36:3000/api/"
  private encadreur  : any;

  constructor(private http:HttpClient , private datepipe :DatePipe) { }

  setHeader(){

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('authorization', 'Bearer ' + localStorage.getItem("token"));
    return headers
  }




  async getEncadreur(){



 const data =  await this.http.get(this.baseUrlLocal+'students/enc',   { headers: this.setHeader() }).toPromise();


return data
}


async getEncadreurSec(){

  let  data =await  this.http.get(this.baseUrlLocal+'students/encSec',  { headers: this.setHeader() }).toPromise();


 return data
 }


 async getDateDebut(){

  var  data  =await  this.http.get(this.baseUrlLocal+'students/datedebut', { headers: this.setHeader() }).toPromise();




 return data
 }

 async getDateFin(){

  var  data  =await  this.http.get(this.baseUrlLocal+'students/datefin',  { headers: this.setHeader() }).toPromise();



 return data
 }





}
