
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
  baseUrlLocal = "http://localhost:4200/evaluation";
  baseUrlLocalp = "http://172.16.60.36:3000/"
  baseUrlLocalk = "http://172.16.60.36:31515/"
  //http://localhost:4200/evaluation?id=3&name=abdellah%20messelleka
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
    this.getMatArray()



   this.studentsService.getStudentNumber().then(res =>
    this.last = res
   )




 this.studentsService.getStudent(9,1)
    this.studentSub = this.studentsService.getStudentUpdateListener().subscribe(
      (students:Students[]) =>{
        this.students =students;
        this.studentsCopy = students ;
        this.rests = Math.max(this.students.length - this.end, 0)



      }

    );






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
    //console.log(randomHash)


this.url = this.baseUrlLocal+`?id=${student.matricule}#${random}`


var addresses = student.encadreurmMail;
var body =`Hi  ${student.encadreur},
%0A
%0A
%0A
Please fellow the link below to evaluate the  student  ${student.nom}  ${student.prenom}
%0A
%0A
%0A
Link :    ${this.url}
%0A
%0A
%0A
Have a nice day
%0A
%0A
%0ABest Regards,`
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
 async getMatArray(){

  this.matArray = await this.studentsService.getEvaMatricule()

 }




 checkMatArray(student : any){

   const mat = student.matricule;
return this.matArray.includes(mat);
 }











}//class
