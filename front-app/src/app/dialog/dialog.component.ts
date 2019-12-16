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
  createPdf(comp: any,info : any, langue){


    const comportement = comp.value
    const informatique = info.value
    const language = langue.value



 let studentsPdf = {


	content: [
{

  columns: [



    {image : 'logo', alignment :  'left' },

     { text:  `
                  Optimum Telecom Algerie S.P.A.
          Route de Wilaya, Lot n° 37/4, Dar El Beida, Alger - Algérie.
                   Département des Ressources Humaines
          Tél. : 0770 85 2110 / 05  -  Fax : 0770 85 2117 / 27 / 07
                     E-Mail: jobs@otalgerie.com
            `, style :'header'},
    ],




},
" ",

	{
			text: 'FICHE DE CANDIDATURE',
			style: 'title'
		},
{text :"_________________________________________________________________________________",style : 'footer'},
" ",
" ",
" ",
{text :"NOM : "+ this.student.nom},
" ",
" ",
{text :"PRENOM : "+ this.student.prenom},
" ",
" ",

{text :"TELEPHONE : "+ this.student.nTelephone},
" ",
" ",

{text :"EMAIL : "+ this.student.email},
" ",
" ",

{text :"University : "+ this.student.etablissement},
" ",
" ",

{text :"DIPLOME OBTENUE: "+ this.student.diplome},
" ",
" ",

{text :"Encadreur : "+ this.student.encadreur},
" ",
" ",

{text :"Departement: "+ this.student.encadreurDEP},
" ",
" ",

{text :"Secteur: "+ this.student.encadreurSec},
" ",
" ",


{text :"DISCRIPTIF DE PROJET: "},
" ",
{text :"  " + this.student.description},
" ",
" ",


{text :"Evaluation : "},
" ",
{text :" comportement :   " + comportement},
" ",
{text :" Connaissances Informatiques :   " + informatique},
" ",
{text :" Connaissances Linguistiques :     " + language},
" ",




	],
	styles: {
		header: {
			fontSize: 10,
      bold: false,
      alignment: 'right'

		},
		title: {
			fontSize: 24,
      bold: true,
      alignment: 'center'

    },
    	footer: {

      bold: true,
      alignment: 'center'

		},
		quote: {
			italics: true
		},
		small: {
			fontSize: 8
    }
  },
  images : {
    logo : 'data:image/png;base64,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'
  }

            }
  pdfMake.createPdf(studentsPdf).open();







  }






  onClickSubmit(){


this.studentService.updateStudent(this.student.matricule,this.angForm.value);
this.dialogRef.close();










  }



}//Class


