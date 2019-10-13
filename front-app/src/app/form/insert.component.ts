import { Component, OnInit,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../students.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {
  baseUrlLocal = "http://localhost";
  baseUrlProd = "http://172.16.60.34"
/* */
  constructor( public studentsService: StudentService ,private _snackBar: MatSnackBar, http:HttpClient) {

   }
   getMatricule(){


    var num = 0 ;

    let  req = new XMLHttpRequest();
    req.open('GET', this.baseUrlLocal+`:3000/api/students/numberEnd`, false);

    //
    req.send(null)

      let data =  parseInt(req.response);
      console.log()

  if (data == null) {
 data = 0
 } else {

  num = data + 1;
 }




    return num
  }

  onAddPost(form:NgForm){


console.log(form.value)

          form.value.matricule = this.getMatricule() ;
          this.studentsService.addStudent(form.value);





       form.reset()

       // console.log(this.studentsService.result)




this.openSnackBar("operation succeeded", "Close");


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnInit() {
  }


}

