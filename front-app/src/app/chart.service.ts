import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe} from '@angular/common';





@Injectable({providedIn :'root'})

export class ChartService  {

  baseUrlLocal = "http://localhost";
  baseUrlProd = "http://172.16.60.34"
  private encadreur  : any;

  constructor(private http:HttpClient , private datepipe :DatePipe) { }




  async getEncadreur(){

 let  data =await  this.http.get(this.baseUrlLocal+':3000/api/students/enc').toPromise();
 //console.log(data)

return data
}


async getEncadreurSec(){

  let  data =await  this.http.get(this.baseUrlLocal+':3000/api/students/encSec').toPromise();
  //console.log(data)

 return data
 }


 async getDateDebut(){
  var array :number[]=[]
  var  data  =await  this.http.get(this.baseUrlLocal+':3000/api/students/datedebut').toPromise();
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
  var  data  =await  this.http.get(this.baseUrlLocal+':3000/api/students/datefin').toPromise();
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
