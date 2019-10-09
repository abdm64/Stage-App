import { Component, OnInit, Inject } from '@angular/core';
import { StudentService } from '../students.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-msg-confirm',
  templateUrl: './msg-confirm.component.html',
  styleUrls: ['./msg-confirm.component.scss']
})
export class MsgConfirmComponent implements OnInit {

  constructor(private studentService: StudentService,
    public dialogRef: MatDialogRef<MsgConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }


  delete(){
    console.log(this.data)
    this.studentService.deleteStudent(this.data.matricule)
    this.dialogRef.close();

  }
  noDelete(){
    this.dialogRef.close();
  }
}
