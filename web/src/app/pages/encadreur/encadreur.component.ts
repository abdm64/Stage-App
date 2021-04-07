import { Component, OnInit, Inject, EventEmitter  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-encadreur',
  templateUrl: './encadreur.component.html',
  styleUrls: ['./encadreur.component.scss']
})
export class EncadreurComponent implements OnInit {
  onAdd = new EventEmitter();


  constructor(
    public dialogRef: MatDialogRef<EncadreurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
     }

  ngOnInit() {


  }
  onConfirmClick() {
    this.onAdd.emit();
    this.dialogRef.close();
  }


  noDelete(){
    this.dialogRef.close();

  }

}
