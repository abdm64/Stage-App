import{Students} from '../../../models/Student'
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../students.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-fetch',
  templateUrl: './fetch.component.html',
  styleUrls: ['./fetch.component.scss']
})
export class FetchComponent implements OnInit{

students: Students[] =[];
private studentSub:Subscription;

    constructor(public studentsService :StudentService){


    }

    ngOnInit(){
      this.studentsService.getStudents();
      this.studentSub = this.studentsService.getStudentUpdateListener().subscribe(
        (students:Students[]) =>{
          this.students =students;

        }
      );
    }

    ngOnDestroy(){
      this.studentSub.unsubscribe();
    }
    
}
