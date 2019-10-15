import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';





@Injectable({providedIn :'root'})

export class ChartService  {

  baseUrlLocal = "http://localhost";
  baseUrlProd = "http://172.16.60.34"
  private encadreur  : any;

  constructor(private http:HttpClient) { }




  async getEncadreur(){

 let  data =await  this.http.get(this.baseUrlLocal+':3000/api/students/enc').toPromise();


return data
}














}
