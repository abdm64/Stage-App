import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentService } from '../students.service';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: './dialog-overview-example-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogOverviewExampleDialog implements OnInit {

  angForm: FormGroup;
  linguistiques: string;
  wilayas: string[] = ['Adrar', 'Chlef', 'Laghouat','Oum El Bouaghi','Batna', 'Béjaïa', 'Biskra','Béchar','Blida','Bouira','Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Alger','Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem','Msila','Mascara','Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arreridj','Boumerdès','El Tarf','Tindouf','Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma','Aïn Témouchent','Ghardaïa','Relizane'];
  WilayaFormControl = new FormControl();
  filteredWilayas: Observable<string[]>;

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

getEncadreur(mat : number,student: any){

this.studentService.getEncadreur(mat).subscribe((data)=>{

  this.pupulatTheData(data,student)
})




}

pupulatTheData(data,student){


   student.encadreurmMail = data.Email_Address
  student.encadreur = data.First_name + ' ' +  data.Last_Name
  student.encadreurID = data.Employee_Number
  student.encadreurDEP = data.Departement
  student.encadreurSec = data.Sector
  student.encadreurmOrg = data.Organisation
  this.putTheData(data)

}
putTheData(data){


  this.angForm.value.encadreurmMail = data.Email_Address
  this.angForm.value.encadreur = data.First_name + ' ' +  data.Last_Name
  this.angForm.value.encadreurID= data.Employee_Number
  this.angForm.value.encadreurDEP = data.Departement
  this.angForm.value.encadreurSec = data.Sector
  this.angForm.value.encadreurmOrg = data.Organisation


}





  onClickSubmit(){



this.studentService.updateStudent(this.student.matricule,this.angForm.value);
this.dialogRef.close();










  }



}//Class


