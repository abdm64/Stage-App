import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Students } from '../../../models/Student';
import { StudentService } from '../students.service';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: './dialog-overview-example-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogOverviewExampleDialog implements OnInit {
  student: Students;
  angForm: FormGroup;

  // angForm = new FormGroup({
  //   name : new FormControl(),
  //   prenom : new FormControl(),
  //   sexe : new FormControl(),
  //   dateNaissance : new FormControl(),
  //   wilaya : new FormControl(),
  //   nTelephone : new FormControl(),
  //   email : new FormControl(),
  //   etablissement : new FormControl(),
  //   diplome : new FormControl(),
  //   theme : new FormControl(),
  //   typeStage : new FormControl(),
  //   typeRapport : new FormControl(),
  //   dateDebut : new FormControl(),
  //   dateFin : new FormControl(),
  //   nbJoursPresence : new FormControl(),
  //   recommandation : new FormControl(),
  //   encadreur : new FormControl(),
  //   encadreurID : new FormControl(),
  //   encadreurmMail : new FormControl(),
  //   encadreurDEP : new FormControl(),
  //   encadreurSec : new FormControl(),
  //   encadreurmOrg : new FormControl(),
  //   attestation : new FormControl(),
  //   matricule : new FormControl()
  // })

  constructor( private fb: FormBuilder ,private  studentService: StudentService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog> ,
    @Inject(MAT_DIALOG_DATA) public matricule: Number) {
      //this.createForm();
    }

    createForm(student : any) {
     // console.log(this.student)
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
    matricule :[student.matricule]
      });
    }


  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {


    this.student = this.getStudent();
   // console.log("///")
  //  console.log(this.student)

    this.createForm(this.student)


    // const student =
  }

  getStudent() {

    const matricule = this.matricule;
    const data = this.studentService.getStudents();
    const res = data.filter(c => c.matricule === matricule)[0];

    return res;
  }



  update(form:NgForm){
    //this.studentService.updateStudent(this.matricule,form.value);
    console.log(this.matricule)
    console.log(form.value)

  }
  onClickSubmit(){
console.log(this.angForm.value)
this.studentService.updateStudent(this.matricule,this.angForm.value);







  }



}//Class


