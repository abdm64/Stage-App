import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { PDFService} from '../pdf.Service';

@Component({
  selector: 'app-evaluation-dialog',
  templateUrl: './evaluation-dialog.component.html',
  styleUrls: ['./evaluation-dialog.component.scss']
})
export class EvaluationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EvaluationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public student: any, public pdf : PDFService)  { }



  ngOnInit() {

  }

  createPdf(evaForm : NgForm ) {


this.pdf.createEvaPdf(evaForm,this.student)

  }

}
