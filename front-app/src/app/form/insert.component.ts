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
/* */
  constructor( public studentsService: StudentService ,private _snackBar: MatSnackBar, http:HttpClient) {

   }
   getMatricule(){


    var num = 0 ;

    let  req = new XMLHttpRequest();
    req.open('GET', `http://172.16.60.34:3000/api/students/numberEnd`, false);

    //
    req.send(null)

      let data =  parseInt(req.response);
  if (data == null) {
 data = 0
  }
      num = data + 1;



    return num
  }

  onAddPost(form:NgForm){


console.log(form.value)

          form.value.matricule = this.getMatricule() ;
          this.studentsService.addStudent(form.value);





     //  form.reset()

       // console.log(this.studentsService.result)




this.openSnackBar(this.studentsService.result, "Close");


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
  }


}

