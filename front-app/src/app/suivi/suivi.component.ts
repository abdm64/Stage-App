
import { Students } from '../../../models/Student';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatIconRegistry, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, style, animate } from '@angular/animations';
import gql from 'graphql-tag';
import { StudentService } from '../students.service';
import { DialogOverviewExampleDialog } from '../dialog/dialog.component';
import { PdfMakeWrapper, Txt, Columns, Img } from 'pdfmake-wrapper';
import { MsgConfirmComponent } from '../msg-confirm/msg-confirm.component';
import { DatePipe} from '@angular/common';



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
private studentSub:Subscription;









fetchArray : any[]
searchTerm = '';

  end = 9;
  rest = 0;
  rests = 0 ;

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

  constructor(public datepipe : DatePipe,  private fb: FormBuilder ,public studentsService :StudentService ,public dialog: MatDialog, private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
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
    width: '60%',


    data:student
  });

  dialogRef.afterClosed().subscribe(result => {

  });
}

  ngOnInit() {
    console.log(localStorage.getItem("user"))

    this.studentsService.getStudents();
    this.studentSub = this.studentsService.getStudentUpdateListener().subscribe(
      (students:Students[]) =>{
        this.students =students;
        this.studentsCopy = students ;
        this.rests = Math.max(this.students.length - this.end, 0)


      }

    );






     }

  setLoading() {
    /*
      total ====> 100%
      data =====> X
    */
    let result = (this.data.length * 100) / this.totalMedics;
    result = ~~(result);
    this.progress = this.progress > result ? this.progress : result;


  }
  filter() {
    if (this.filterObj.value == null) { this.filterObj.setValue(3); }
    if (this.searchObj.value === '') {
      this.filterData = this.data;
      this.loading = false;
      this.setLoad(9);
      return;
    }

    this.filterData = this.data.filter(item => {
      const val = Object.values<any>(item)[this.filterObj.value];
      if (this.filterObj.value === 0) {
        return val === this.searchObj.value;
      }
      return !!val && val.toLowerCase().search(new RegExp(this.searchObj.value.toLowerCase())) !== -1;
    });

    this.setLoad(9);
    this.loading = false;
  }
  sortBy(index: number) {
    this.filterData = this.filterData.slice().sort((a, b) => {

      a = Object.values(a)[index];
      b = Object.values(b)[index];

      if (a === b) {
        return 0;
      } else {
        if (this.ascending)
          return a > b ? 1 : -1;
        else
          return a < b ? 1 : -1;
      }
    });
    this.setLoad(9);
  }
  reverseSort(bool) {
    if (bool !== this.ascending) {
      this.ascending = !this.ascending;
      this.filterData = this.filterData.slice().reverse();
    }
  }
  setLoad(val) {

    this.end = val;
    this.rests = this.students.length  - this.end
    if (this.students.length === 0)
      this.rest = 0;

    else
      this.rest = Math.max(this.students.length - this.end, 0);
      this.rests = Math.max(this.students.length - this.end, 0);

}
/*
  tracbyfn(index, item) {
    return index + item.ID;
  }

*/

  ngOnDestroy(){
    this.studentSub.unsubscribe();
  }

   openDialogDelete(student : any): void { // hadi dialog ta3 click hadik
    const dialogRef = this.dialog.open(MsgConfirmComponent, {
      width: '40%',
      data: student
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  async onCreatePdf(student : any){



    const pdf = new PdfMakeWrapper();



//pdf.add( await new Img('data:image/png;base64,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').fontSize(2).build() );



    pdf.add( new Columns([ '', 'Optimum Telecom Algerie S.P.A.' ]).columnGap(200).bold().fontSize(8).end);
    pdf.add( new Columns([ '', 'Route de Wilaya, Lot n° 37/4, Dar El Beida, Alger - Algérie.' ]).columnGap(100).fontSize(8).end);
    pdf.add( new Columns([ '', ' Département des Ressources Humaines  ' ]).columnGap(200).fontSize(8).bold().end);
    pdf.add( new Columns([ '', ' Tél. : 0770 85 2110 / 05  -  Fax : 0770 85 2117 / 27 / 07  ' ]).columnGap(100).fontSize(8).bold().end);
    pdf.add( new Columns([ '', ' E-Mail: jobs@otalgerie.com' ]).columnGap(200).bold().fontSize(8).end);
    //pdf.header('this is header')


    pdf.add(await new Img('../assets/logo.png').alignment('left').build());

    pdf.add(pdf.ln(2));
    pdf.add(new Txt('CERTIFICAT DE STAGE').alignment('center').bold().fontSize(20).end );
    pdf.add(new Txt('_________________________________________________________________________________').alignment('center').italics().bold().end );

    pdf.add(pdf.ln(3));

    pdf.add( new Txt([  'Je soussignée,Mme. Fatma TILIOUINE agissant en qualité de Digital Learning &                                       '  ]).alignment('center').end);

    pdf.add(new Txt('Development Professional de la société Optimum Telecom Algérie S.P.A, sise à      ').end );
    pdf.add(new Txt('                            '+'                           Route de Wilaya, Lot n° 37/4, Dar El Beida, Alger - Algérie.'+'                                                      ').end );
    pdf.add(pdf.ln(2));
    pdf.add(new Txt('Certifie par le présent que :').alignment('center').end );
    pdf.add(pdf.ln(2));
    pdf.add(new Txt('Mme/M                       '+student.nom+'     '+student.prenom+'          étudiant(e) à         '+student.etablissement+'                   ').alignment('center').end );


    pdf.add(new Txt('a suivi avec succès un stage pratique au sein de la société Optimum Telecom Algérie               ' ).end );
    pdf.add(new Txt('«DJEZZY» au Département «'+'                '+student.encadreurDEP+'                » service «                '+student.encadreurSec+'                 »').end );
    let dd = student.dateDebut
    let df =student.dateFin
    pdf.add(new Txt('pour la période allant du '+ this.datepipe.transform(dd ,'dd/MM/yyyy')+' au '+this.datepipe.transform(df , 'dd/MM/yyyy')+'.').end );
    pdf.add(pdf.ln(3));
    pdf.add(new Txt('Au cours de cette période elle a intégré l’équipe du service                                    '+'                                           ').alignment('center').end );



    pdf.add(new Txt('«       '+student.encadreurSec+'       » avec aisance, rigueur et professionnalisme. ').end );
    pdf.add(pdf.ln(4));

    pdf.add(new Txt('Ce certificat est délivré à l’intéressé(e) pour servir et valoir ce que de droit').alignment('center').end );

    pdf.add(pdf.ln(4));
    pdf.add( new Columns([ '', 'Fait à Alger, le ' ]).columnGap(100).end);
    pdf.add(pdf.ln(8));
    pdf.add(new Txt('_____________________________________________________________________Membre du groupe ORASCOM TELECOM_______________').alignment('center').fontSize(8).end);
    pdf.add(new Txt(' Optimum Telecom Algérie S.p.a – Route de Wilaya, Lot n° 37/4, Dar El Beida, Alger - Algérie.').alignment('center').fontSize(8).end);
    pdf.add(new Txt('Capital social : 164.002.000.000,00 DA - Identifiant fiscal : 001316099189030 - RC : 16/00- 0991890 B 13 – Tel/Fax : 07 70 85 00 00').alignment('center').fontSize(8).end);












    pdf.create().open();

  }


  search(): void {
    let term = this.searchTerm;
    this.students = this.studentsCopy.filter(function(student) {

        return student.nom.toString().toLowerCase().indexOf(term.toString().toLowerCase()) >= 0 || student.prenom.toString().toLowerCase().indexOf(term.toString().toLowerCase()) >= 0 || student.encadreur.toString().toLowerCase().indexOf(term.toString().toLowerCase()) >= 0|| student.diplome.toString().toLowerCase().indexOf(term.toString().toLowerCase()) >= 0;
    });
    this.rests = Math.max(this.students.length - this.end, 0)






 }











}//class
