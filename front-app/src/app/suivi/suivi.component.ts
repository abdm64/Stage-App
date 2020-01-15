
import { Students } from '../../../models/Student';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatIconRegistry, MatDialog, PageEvent, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, style, animate } from '@angular/animations';
import gql from 'graphql-tag';
import { StudentService } from '../students.service';
import { DialogOverviewExampleDialog } from '../dialog/dialog.component';
import { EvaluationDialogComponent} from '../evaluation-dialog/evaluation-dialog.component';
import { MsgConfirmComponent } from '../msg-confirm/msg-confirm.component';
import { PDFService} from '../pdf.Service';
import { DatePipe} from '@angular/common';
import { ClipboardService } from 'ngx-clipboard'






export const fade = trigger('fade', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate('400ms {{delay}}ms linear', style({ opacity: 1 }))
  ], { params: { delay: '30' } })
]);

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss'],
  animations: [fade],

})
export class SuiviComponent implements OnInit {
  students: Students[] =[];
  studentsCopy: Students[] =[];
  mySubscription: any;
  placeHolder = "ALL"
private studentSub:Subscription;









fetchArray : any[]
matArray : number[]
searchTerm ='';

  end = 9;
  rest = 0;
  rests = 0 ;
  last : any ;
  pageOption = [9];
  pageIndex = 0;
  baseUrlLocal = localStorage.getItem('url')+"evaluation";
  baseUrlLocalp = "http://172.16.60.36:3000/evaluation"
  baseUrlLocalk = "http://172.16.60.36:31515/"

  url : string ='';
  ascending = false;
  totalMedics: any;
  loading = false;
  type = 'determinate';
  progress = 0;
  mobile = false;
  data = [];
  filterData = [];
  shownData = [];
  form: FormGroup;
  filterObj = new FormControl();
  searchObj = new FormControl('');
  filterList: Array<string>;
  totalQuery = gql`query{totalMedics}`;
  dataQuery = gql`
    query($start:Int!,$end:Int!){
      medicaments(start:$start,end:$end){
        ID
        DRUG_CLASS
        PHARMACOLOGY_CLASS
        NUM_ENREGISTREMENT
        CODE
        DENOMINATION_COMMUNE_INTERNATIONALE
        NOM_DE_MARQUE
        FORME
        DOSAGE
        COND
        LISTE
        P1
        P2
        OBS
        LABORATOIRES_DETENTEUR_DE_LA_DECISION_DENREGISTREMENT
        PAYS_DU_LABORATOIRE_DETENTEUR_DE_LA_DECISION_DENREGISTREMENT
        DATE_DENREGISTREMENT_INITIAL
        DATE_DENREGISTREMENT_FINAL
        TYPE
        STATUT
        DUREE_DE_STABILITE
        PRIX_PORTE_SUR_LA_DECISION_DENREGISTREMENT
        REMBOURSEMENT
      }
    }
  `;

  // tslint:disable-next-line: max-line-length
  constructor(public datepipe : DatePipe ,public studentsService :StudentService ,public dialog: MatDialog, private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer, public pdf : PDFService, private _clipboardService: ClipboardService,private _snackBar: MatSnackBar) {

    /* form init */
    this.form = new FormGroup({
      search: this.searchObj,
      filter: this.filterObj
    });
    /* add icons */
   this.matIconRegistry.addSvgIcon(
     'labo',
     this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/labo.svg')
    );
     this.matIconRegistry.addSvgIcon(
     'price',
     this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/price.svg')
   );
    this.matIconRegistry.addSvgIcon(
      'therapy',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/therapy.svg')
    );
     this.matIconRegistry.addSvgIcon(
     'input_way',
     this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/inputWay.svg')
   );
   this.matIconRegistry.addSvgIcon(
     'description',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/description.svg')
    );
    /* get data length */

  }




/////////////////////////////////////////////////////////////*

openDialog(student : any): void { // hadi dialog ta3 click hadik
  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    width: '70%',
    height: '75%',


    data:student
  });

  dialogRef.afterClosed().subscribe(result => {

  });
}

  ngOnInit() {



    this.studentsService.getMatricule()
   this.studentsService.getStudentNumber().subscribe(
      (num) => {

          this.last = num
      }

   )




 this.studentsService.getStudent(9,1)
    this.studentSub = this.studentsService.getStudentUpdateListener().subscribe(
      (students:Students[]) =>{
        this.students =students;
      }

    );




    this.getMatArray()


     }


  ngOnDestroy(){
    this.studentSub.unsubscribe();
  }

   openDialogDelete(student : any): void { // hadi dialog ta3 click hadik
    const dialogRef = this.dialog.open(MsgConfirmComponent, {
      width: '40%',
      panelClass: 'modifi',
      data: student
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }

  openMail(student : any){
    let random = this.randomString(10)
    let randomHash = {
      id : student.matricule,
      random : random
    }
    //post the randomHash to API
    this.studentsService.saveRandomHash(randomHash)



this.url = this.baseUrlLocal+`?id=${student.matricule}#${random}`


var addresses = student.encadreurmMail;
let  logo : 'data:image/png;base64,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'
var body =`Bonjour  ${student.encadreur},
%0A
%0A
%0A
Merci de bien vouloir renseigner la fiche d'évaluation de  ${student.nom}  ${student.prenom} en cliquant sur le lien ci-aprés
%0A
%0A
%0A
Lien :    ${this.url}
%0A
%0A
%0A
%0A
%0A
%0ABien cordialement,
%0A
%0A
%0A
${logo}
`
var subject = `Evaluation de  ${student.nom}  ${student.prenom} `

var mail = `mailto: ${addresses}?subject=${subject}&body=${body}`
  window.open(mail);
  }





  search(): void{
   const term = this.searchTerm;

    if (!term.replace(/\s/g, '').length) {

      this.studentsService.getStudent(9,this.pageIndex + 1)
    //  this.last = this.students.length

    }

     else{

      this.studentsService.getStudentSearch(term)
      .subscribe((postData)=>{

        this.last = postData.maxNumber
        this.students = postData.students;




    });




    }



 }
  randomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


 getStudentDate(student : any){

  const d1 = new Date(Date.now())
  const d2 = new Date(student.dateFin)

 const same = d1.getTime() - d2.getTime() ;

  var days = (same / (60*60*24*1000));

 return days < 0

 }


 selectEncours( ){
   var studentEnd : any[] = []
   this.students = this.studentsCopy

  for (let student of this.students){

  if (this.getStudentDate(student)) {
    //do the staff
    studentEnd.push(student)



  }


  }
this.students = studentEnd
this.rests = Math.max(this.students.length - this.end, 0)
this.placeHolder = "en cours"

 }
 selectStudenEnd(){
  var studentEnd : any[] = []
  this.students = this.studentsCopy

 for (let student of this.students ){

 if (!this.getStudentDate(student)) {
   //do the staff
   studentEnd.push(student)



 }


 }
this.students = studentEnd
this.rests = Math.max(this.students.length - this.end, 0)
this.placeHolder = "Treminé"

}
selectAllStudent(){

  this.students = this.studentsCopy
  this.placeHolder = "ALL"
}





onChangePage(pageData : PageEvent){
  const pageIndex = pageData.pageIndex;
  this.pageIndex = pageIndex
  this.studentsService.getStudent(9,pageIndex + 1)



}



 createPdf(student : any){
   this.pdf.createPdfStage(student)


 }
 async createPdfeva(student : any){

  await this.pdf.createEvaPdf(student)
 }

  getMatArray(){

  this.studentsService.getEvaMatricule().subscribe((matArray)=> {

    this.matArray = matArray
  })


 }




  checkMatArray(student : any){

   const mat = student.matricule;
   const empty = this.matArray === undefined

    if (!empty) {
      return   this.matArray.includes(mat);

    }

 }











}//class
