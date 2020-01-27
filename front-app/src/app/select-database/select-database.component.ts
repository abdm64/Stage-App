import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { environment } from '../../environments/environment';
// StudentService handel all networking related to student


const  BASE_URL = environment.apiUrl+'api';


@Component({
  selector: 'app-select-database',
  templateUrl: './select-database.component.html',
  styleUrls: ['./select-database.component.scss']
})
export class SelectDatabaseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
actuel(){
  this.selectSide('test')
  console.log("actuel");
  //send actuel api and move to login page
  this.router.navigate(['']);


}

archive(){
  this.selectSide('archive')
  console.log("Archive");
  //get archive api and move it to login page
  this.router.navigate(['']);

}

async selectSide(id){

  const res  =  await fetch(BASE_URL+`/`+id)
  const data = await res.json()


  return data
}



}//
