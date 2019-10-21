import { Component, OnInit,Input } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { StudentService } from '../students.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { EncadreurComponent } from '../encadreur/encadreur.component';



@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {
  baseUrlLocalp = "http://localhost:3000/api/";
  baseUrlLocal = "http://172.16.60.34:3000/api/"
  encadreur : any = {


    Last_Name: "",
    First_name: "",
    Sector: null,
    Departement: null,
    Organisation: null,
    Position: null,
    Job: null,
    Email_Address: null,

  }



  constructor( public studentsService: StudentService ,private _snackBar: MatSnackBar, http:HttpClient,public dialog: MatDialog) {

   }
   getMatricule(){


    var num = 0 ;

    let  req = new XMLHttpRequest();
    req.open('GET', this.baseUrlLocal+`students/numberEnd`, false);

    //
    req.send(null)

      let data =  JSON.parse(req.response)


  if (data === null ) {
 num = 1
 } else {

  num = data.matricule + 1
 }



console.log(num)
    return num
  }

  onAddPost(form:NgForm){

console.log(this.getMatricule())

          form.value.encadreur = this.encadreur.First_name + " " + this.encadreur.Last_Name
          form.value.encadreurDEP = this.encadreur.Departement
          form.value.encadreurmMail = this.encadreur.Email_Address
          form.value.encadreurSec = this.encadreur.Sector
          form.value.encadreurmOrg = this.encadreur.Position
          form.value.user = localStorage.getItem("user")
          form.value.matricule = this.getMatricule() ;

          this.studentsService.addStudent(form.value);





      // form.reset()









  }


  ngOnInit() {
  }

  getEncadreur(encadreurID : Number){
    let  req = new XMLHttpRequest();
    req.open('GET', this.baseUrlLocal+`encadreur/data/`+encadreurID, false);
    req.send(null);
    let data = JSON.parse(req.response)
   // this.encadreur = data
  //  alert(  data.First_name+ " " +data.Last_Name + " is the Responsable"  );


  this.openValidateDialog(data)
  return data

  }

  confirmEncadreur(data:any, form:NgForm){
    this.encadreur = data
    this.encadreur = this.getEncadreur(form.value.encadreurID)
  }

  openValidateDialog(data :any): void {
    //console.log(data)
    const dialogRef = this.dialog.open(EncadreurComponent, {
      width: '40%',
      data: data,

    });
    const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
      this.encadreur = data
    });

    dialogRef.afterClosed().subscribe(result => {


    });

  }




}

