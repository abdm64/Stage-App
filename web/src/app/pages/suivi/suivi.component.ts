

import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatIconRegistry, MatDialog, PageEvent, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, style, animate } from '@angular/animations';
import { StudentService } from '../../services/students.service';
import { DialogOverviewExampleDialog } from '../dialog/dialog.component';
import { MsgConfirmComponent } from '../msg-confirm/msg-confirm.component';
import { PDFService} from '../../services/pdf.Service';
import { DatePipe} from '@angular/common';
import { ClipboardService } from 'ngx-clipboard'
import { Student} from  '../../models/Student.model'



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
  students: Student[] =[];
  studentsCopy: Student[] =[];
  mySubscription: any;
  placeHolder = "Tous";
  studentType : string[] = ["Stagiaires","Apprentis"]
  studentTitle : string
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
  

  // tslint:disable-next-line: max-line-length
  constructor(public datepipe : DatePipe ,public studentsService :StudentService ,public dialog: MatDialog, private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer, public pdf : PDFService, private _clipboardService: ClipboardService,private _snackBar: MatSnackBar) {
            const type   =   localStorage.getItem('type') || '0'
            if(type === '0') {
              this.studentTitle = 'Stagiaires'
            } else  if (type === "1"){
              this.studentTitle = 'Apprentis '

            }


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

  this.studentsService.getStudentSearch('').subscribe((postData)=>  this.last = postData.maxNumber);
    this.studentSub = this.studentsService.getStudentUpdateListener().subscribe(
      (students:any[]) =>{
        this.students = students;
        this.studentsCopy = students;
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
    var rootUrl = location.protocol + '//' + location.host

    let random = this.randomString(10)
    let randomHash = {
      id : student.matricule,
      random : random,
      firstName : student.prenom,
      lastName : student.nom
    }
    //post the randomHash to API
    this.studentsService.saveRandomHash(randomHash)



this.url = rootUrl+`/evaluation?id=${student.matricule}#${random}`


var addresses = student.encadreurmMail;

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
Djezzy Academy
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
  randomString(length): string {
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


 selectEncours(){
  this.students = this.studentsCopy

   var studentEnd : any[] = []


  for (let student of this.students){

  if (this.getStudentDate(student)) {

    studentEnd.push(student)



  }


  }
this.students = studentEnd

this.placeHolder = "en cours"

 }
 //
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

this.placeHolder = "Treminé"

}
selectAllStudent(){

  this.students = this.studentsCopy

  this.placeHolder = "Tous"
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
