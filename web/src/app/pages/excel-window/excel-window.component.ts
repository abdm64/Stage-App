import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../../services/execl.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-excel-window',
  templateUrl: './excel-window.component.html',
  styleUrls: ['./excel-window.component.scss']
})
export class ExcelWindowComponent implements OnInit {

  constructor(private excelService: ExcelService) { }

  ngOnInit() {
  }




  export(form: NgForm){

    //this.excelService.exportAsExcelFile(dateDebut,dateFin , 'stage');
    var d = new Date(form.value.dateDebut)

    var f = new Date(form.value.dateFin)
   //console.log((d.toISOString()))

     this.excelService.exportEx(d.toISOString(),f.toISOString());

  }

  

}
