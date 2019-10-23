
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
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;





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

  // tslint:disable-next-line: max-line-length
  constructor(public datepipe : DatePipe ,public studentsService :StudentService ,public dialog: MatDialog, private matIconRegistry: MatIconRegistry,
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
  // filter() {
  //   if (this.filterObj.value == null) { this.filterObj.setValue(3); }
  //   if (this.searchObj.value === '') {
  //     this.filterData = this.data;
  //     this.loading = false;
  //     this.setLoad(9);
  //     return;
  //   }

  //   this.filterData = this.data.filter(item => {
  //     const val = Object.values<any>(item)[this.filterObj.value];
  //     if (this.filterObj.value === 0) {
  //       return val === this.searchObj.value;
  //     }
  //     return !!val && val.toLowerCase().search(new RegExp(this.searchObj.value.toLowerCase())) !== -1;
  //   });

  //   this.setLoad(9);
  //   this.loading = false;
  // }
  // sortBy(index: number) {
  //   this.filterData = this.filterData.slice().sort((a, b) => {

  //     a = Object.values(a)[index];
  //     b = Object.values(b)[index];

  //     if (a === b) {
  //       return 0;
  //     } else {
  //       if (this.ascending)
  //         return a > b ? 1 : -1;
  //       else
  //         return a < b ? 1 : -1;
  //     }
  //   });
  //   this.setLoad(9);
  // }
  // reverseSort(bool) {
  //   if (bool !== this.ascending) {
  //     this.ascending = !this.ascending;
  //     this.filterData = this.filterData.slice().reverse();
  //   }
  // }
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
      panelClass: 'modifi',
      data: student
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

onCreatePdf(student : any){



    const pdf = new PdfMakeWrapper();



//pdf.add( await new Img('data:image/png;base64,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').fontSize(2).build() );

const imag = new Img('../assets/logo.png').build()

    pdf.add( new Columns([ '', 'Optimum Telecom Algerie S.P.A.' ]).columnGap(200).bold().fontSize(8).end);
    pdf.add( new Columns([ '', 'Route de Wilaya, Lot n° 37/4, Dar El Beida, Alger - Algérie.' ]).columnGap(100).fontSize(8).end);
    pdf.add( new Columns([ '', ' Département des Ressources Humaines  ' ]).columnGap(200).fontSize(8).bold().end);
    pdf.add( new Columns([ '', ' Tél. : 0770 85 2110 / 05  -  Fax : 0770 85 2117 / 27 / 07  ' ]).columnGap(100).fontSize(8).bold().end);
    pdf.add( new Columns([ '', ' E-Mail: jobs@otalgerie.com' ]).columnGap(200).bold().fontSize(8).end);


    //       //  let image = await new Img('../assets/logo.png')
    // pdf.header(`
    //       Optimum Telecom Algerie S.P.A.
    //       Route de Wilaya, Lot n° 37/4, Dar El Beida, Alger - Algérie.
    //       Département des Ressources Humaines
    //       Tél. : 0770 85 2110 / 05  -  Fax : 0770 85 2117 / 27 / 07
    //       E-Mail: jobs@otalgerie.com
    //         `)



  // pdf.add( new Img('../assets/logo.png').alignment('left').build());

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
    if (term === undefined){

      console.log("undefined")
    } else {

       this.students = this.studentsCopy.filter(function(student) {

        return student.nom.toString().toLowerCase().indexOf(term.toString().toLowerCase()) >= 0 || student.prenom.toString().toLowerCase().indexOf(term.toString().toLowerCase()) >= 0 || student.encadreur.toString().toLowerCase().indexOf(term.toString().toLowerCase()) >= 0|| student.diplome.toString().toLowerCase().indexOf(term.toString().toLowerCase()) >= 0 || student.matricule.toString().toLowerCase().indexOf(term.toString().toLowerCase()) >= 0;
    });
    this.rests = Math.max(this.students.length - this.end, 0)

    }






 }

 createPdf(student : any){

//console.log("pdf created")
    let db = student.dateDebut
    let df =student.dateFin
    let dateNow = Date.now()

 let dd = {


	content: [
{

  columns: [



    {image :'data:image/png;base64,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', alignment :  'left' },

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
			text: 'CERTIFICAT DE STAGE',
			style: 'title'
		},
{text :"_________________________________________________________________________________",style : 'footer'},
" ",
" ",
" ",

{ text : ' Je soussignée, Mme. Fatma TILIOUINE agissant en qualité de Digital Learning &' , alignment : 'center'},

{

  text: `Development Professional de la société Optimum Telecom Algérie S.P.A, sise à
 Route de Wilaya, Lot n° 37/4, Dar El Beida, Alger - Algérie. `, alignment : 'left'
},
" ",
" ",
{
  text : 'Certife par le présent que :', alignment: 'center'
},
" ",

{

  text : 'Mme/M  '+student.nom+" "+ student.prenom+' étudiant(e) à  '+ student.etablissement+ '  a suivi avec succès un stage pratique au sein de la société Optimum Telecom Algérie « DJEZZY » au Département « '+student.encadreurDEP+ ' » service « '+student.encadreurSec+ ' »',
  alignment: 'left'
},
" ",
'pour la période allant du '+this.datepipe.transform(db ,'dd/MM/yyyy')+' au '+this.datepipe.transform(df , 'dd/MM/yyyy')+'.'   ,
" ",
{text : 'Au cours de cette période elle a intégré l’équipe du service « '+ student.encadreurSec + ' » avec aisance, rigueur et professionnalisme .'},
" ",
" ",
" ",
" ",

{text : 'Ce certificat est délivré à l’intéressé(e) pour servir et valoir ce que de droit', alignment : 'right'},
" ",
" ",
" ",
" ",
" ",
" ",
{text : 'Fait à Alger, le ' +this.datepipe.transform(dateNow ,'dd/MM/yyyy') , alignment : 'right'},
" ",
" ",
" ",
" ",
" ",
" ",
" ",
" ",
" ",
" ",


{text :"______________________________________________ Membre du groupe VEON ______________", style : 'footer'},
{text : `Optimum Telecom Algérie S.p.a – Route de Wilaya, Lot n° 37/4, Dar El Beida, Alger - Algérie.
Capital social : 164.002.000.000,00 DA - Identifiant fiscal : 001316099189030 - RC : 16/00- 0991890 B 13 – Tel/Fax : 07 70 85 00 00') ` , alignment : 'center'},



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
	}

            }
  pdfMake.createPdf(dd).open();
 }











}//class
