import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { environment } from '../../environments/environment';
import { StudentService } from '../students.service'


const  BASE_URL = environment.apiUrl+'api?archive=';


@Component({
  selector: 'app-select-database',
  templateUrl: './select-database.component.html',
  styleUrls: ['./select-database.component.scss']
})
export class SelectDatabaseComponent implements OnInit {

  constructor(private router: Router, public studentService : StudentService) { }

  ngOnInit() {
  }
actuel(){

  this.studentService.selectSide('false')


  this.router.navigate(['']);


}

archive(){

  this.studentService.selectSide('true')
  this.router.navigate(['']);

}




}//
