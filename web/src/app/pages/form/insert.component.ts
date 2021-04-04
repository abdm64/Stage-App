import { Component, OnInit,Input } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { StudentService } from '../../services/students.service';
import { MatDialog } from '@angular/material';
import { EncadreurComponent } from '../encadreur/encadreur.component';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';



const   BASE_URl = environment.apiUrl + 'api';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {

  wilayas: string[] = ['Adrar', 'Chlef', 'Laghouat','Oum El Bouaghi','Batna', 'Béjaïa', 'Biskra','Béchar','Blida','Bouira','Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Alger','Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem','Msila','Mascara','Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arreridj','Boumerdès','El Tarf','Tindouf','Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma','Aïn Témouchent','Ghardaïa','Relizane'];
  WilayaFormControl = new FormControl();
  filteredWilayas: Observable<string[]>;
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


 async onAddPost(form:NgForm,wilaya: string){





          form.value.encadreur = this.encadreur.First_name + " " + this.encadreur.Last_Name
          form.value.encadreurDEP = this.encadreur.Departement
          form.value.encadreurmMail = this.encadreur.Email_Address
          form.value.encadreurSec = this.encadreur.Sector
          form.value.encadreurmOrg = this.encadreur.Position
          form.value.user = localStorage.getItem("user")
          form.value.wilaya = wilaya
          form.value.nom = form.value.nom.toUpperCase()

          this.studentsService.addStudent(form.value);


        













  }


  ngOnInit() {
    this.filteredWilayas = this.WilayaFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );


  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.wilayas.filter(wilaya => wilaya.toLowerCase().includes(filterValue));
  }
   getEncadreur(encadreurID : number){

    this.studentsService.getEncadreur(encadreurID).subscribe((enc)=> {
     this.openValidateDialog(enc)

     })

    }





  confirmEncadreur(data:any, form:NgForm){
    this.encadreur = data
   // this.encadreur = this.getEncadreur(form.value.encadreurID)
   this.studentsService.getEncadreur(form.value.encadreurID).subscribe((enc)=> {
    this.encadreur = enc

   })
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

