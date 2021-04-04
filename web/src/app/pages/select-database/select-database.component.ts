import { Component, OnInit, OnChanges } from '@angular/core';
import {Router} from '@angular/router';
import { StudentService } from '../../services/students.service';





@Component({
  selector: 'app-select-database',
  templateUrl: './select-database.component.html',
  styleUrls: ['./select-database.component.scss']
})
export class SelectDatabaseComponent implements OnInit {
 token = "joaGdhXSmCyo1Vs7H7DZ";
 random : string = window.location.hash.substr(1);

  constructor(private router: Router, public studentService : StudentService) { }



  ngOnInit() {

    this.protectRoute()
  }
selectSide(value){
  this.studentService.selectSide(value);
  this.router.navigate(['']);

}
protectRoute(){
const equ = this.token === this.random
  if (!equ){
    this.router.navigate(['']);
  }

}





}//
