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

 let  data =await  this.http.get(this.baseUrlLocal+'students/enc',   { headers: this.setHeader() }).toPromise();
 //console.log(data)

return data
}


async getEncadreurSec(){

  let  data =await  this.http.get(this.baseUrlLocal+'students/encSec',  { headers: this.setHeader() }).toPromise();
  //console.log(data)

 return data
 }


 async getDateDebut(){
  var array :number[]=[]
  var  data  =await  this.http.get(this.baseUrlLocal+'students/datedebut', { headers: this.setHeader() }).toPromise();
  for (let item in data){
    //console.log(this.datepipe.transform(data[item],'MM'));

    array.push(Number(this.datepipe.transform(data[item],'MM')))

  }

  // var test :number[]=[2,3,9]
  // console.log(test.some(e => e === 7));    //if 7 exist
  // test.splice(2, 0,5);      //insert at 2
  // console.log(test)

 //console.log(array)
 array.sort((a,b)=>a-b)
 //console.log(array)
 return array
 }

 async getDateFin(){
  var array :number[]=[]
  var  data  =await  this.http.get(this.baseUrlLocal+'students/datefin',  { headers: this.setHeader() }).toPromise();
  for (let item in data){
    //console.log(this.datepipe.transform(data[item],'MM'));

    array.push(Number(this.datepipe.transform(data[item],'MM')))

  }
 //console.log(array)
 array.sort((a,b)=>a-b)
 //console.log(array)
 return array
 }





}
