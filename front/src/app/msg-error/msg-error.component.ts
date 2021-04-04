import { Component, OnInit,Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-msg-error',
  templateUrl: './msg-error.component.html',
  styleUrls: ['./msg-error.component.scss']
})
export class MsgErrorComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<MsgErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public message: any) { }

  ngOnInit() {
  }

  onClose(){
    this.dialogRef.close();
  }

}
