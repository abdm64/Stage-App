import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

const  BASE_URL = environment.apiUrl + 'api/v2/dashboard';





@Injectable({providedIn :'root'})
//StudentService handel all networking related to dashboard

export class ChartService  {

  type : string
  urlType : string

  constructor(private http:HttpClient) {
    const type = localStorage.getItem('type') || '0'
      this.urlType = `${BASE_URL}/${type}`
   }

  setHeader(){

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('authorization', 'Bearer ' + localStorage.getItem("token"));
    return headers
  }




  async getEncadreur(year : number){



 const data =  await this.http.get(this.urlType+'/enc?year='+year,   { headers: this.setHeader() }).toPromise();


return data
}


async getEncadreurSec(year:number){

  let  data =await  this.http.get(this.urlType+'/encSec?year='+year,  { headers: this.setHeader() }).toPromise();


 return data
 }


 async getDateDebut(year){

  var  data  =await  this.http.get(this.urlType+'/datedebut?year='+year, { headers: this.setHeader() }).toPromise();




 return data
 }

 async getDateFin(year){

  var  data  =await  this.http.get(this.urlType+'/datefin?year='+year,  { headers: this.setHeader() }).toPromise();



 return data
 }
 async getTypes(year){

  var  data  =await  this.http.get(this.urlType+'/types?year='+year,  { headers: this.setHeader() }).toPromise();



 return data
 }





}
