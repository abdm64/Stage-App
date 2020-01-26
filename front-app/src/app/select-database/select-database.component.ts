import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-select-database',
  templateUrl: './select-database.component.html',
  styleUrls: ['./select-database.component.scss']
})
export class SelectDatabaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
actuel(){
  console.log("actuel");
  //send actuel api and move to login page 

}

archive(){
  console.log("actuel");
  //get archive api and move it to login page


}

}
