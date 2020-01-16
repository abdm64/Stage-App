import { Component, OnInit,Input } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { StudentService } from '../students.service';
import { MatDialog } from '@angular/material';
import { EncadreurComponent } from '../encadreur/encadreur.component';
import { environment } from '../../environments/environment';



const   BASE_URl = environment.apiUrl + 'api';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {


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



  constructor( public studentsService: StudentService, public dialog: MatDialog) {

   }


 async onAddPost(form:NgForm){


  let mat =   await this.studentsService.getMatricule()


          form.value.encadreur = this.encadreur.First_name + " " + this.encadreur.Last_Name
          form.value.encadreurDEP = this.encadreur.Departement
          form.value.encadreurmMail = this.encadreur.Email_Address
          form.value.encadreurSec = this.encadreur.Sector
          form.value.encadreurmOrg = this.encadreur.Position
          form.value.user = localStorage.getItem("user")
          form.value.matricule = mat;
          form.value.nom = form.value.nom.toUpperCase()
          this.studentsService.addStudent(form.value);


          //form.reset()













  }


  ngOnInit() {

  }

 async getEncadreur(encadreurID : Number){

  const res=  await fetch( BASE_URl+`/encadreur/data/`+encadreurID)
  const data = await res.json()


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

