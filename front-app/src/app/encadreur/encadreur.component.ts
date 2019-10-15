import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-encadreur',
  templateUrl: './encadreur.component.html',
  styleUrls: ['./encadreur.component.scss']
})
export class EncadreurComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<EncadreurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    
  }


  noDelete(){
    this.dialogRef.close();

  }

}
