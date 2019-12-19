import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentService } from '../students.service';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: './dialog-overview-example-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogOverviewExampleDialog implements OnInit {

  angForm: FormGroup;
  linguistiques: string;


  constructor( private fb: FormBuilder ,private  studentService: StudentService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog> ,
    @Inject(MAT_DIALOG_DATA) public student: any) {

    }

    createForm(student : any) {

  this.angForm = this.fb.group({

        nom : [student.nom],
        prenom:[student.prenom],
        sexe :[student.sexe] ,
        dateNaissance :[student.dateNaissance] ,
        wilaya : [student.wilaya],
        nTelephone :[student.nTelephone] ,
        email : [student.email],
        etablissement :[student.etablissement] ,
        diplome :[student.diplome] ,
        theme :[student.theme],
        typeStage : [student.typeStage],
        typeRapport : [student.typeRapport],
        dateDebut :[student.dateDebut] ,
        dateFin :[student.dateFin] ,
        nbJoursPresence : [student.nbJoursPresence],
        recommandation :[student.recommandation] ,
        encadreur : [student.encadreur],
        encadreurID : [student.encadreurID],
        encadreurmMail :[student.encadreurmMail],
        encadreurDEP : [student.encadreurDEP],
        encadreurSec : [student.encadreurSec],
        encadreurmOrg :[student. encadreurmOrg ] ,
        attestation :[student.attestation] ,
        matricule :[student.matricule],
        description:[student.description]

      });
    }


  onNoClick(): void {
    this.dialogRef.close();
  }
  cancelOperation() {

    this.dialogRef.close();
  }
  ngOnInit() {





    this.createForm(this.student)



  }







  onClickSubmit(){


this.studentService.updateStudent(this.student.matricule,this.angForm.value);
this.dialogRef.close();










  }



}//Class


