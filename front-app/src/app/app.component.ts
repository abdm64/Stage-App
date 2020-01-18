import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSidenav } from '@angular/material';
import { ExcelWindowComponent } from './excel-window/excel-window.component';
import {AuthGuard} from './auth.guard';
import { AuthService } from './auth.service';
import { StudentService} from './students.service'





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user : string
  auth = [AuthGuard]
  superusers : string[]

  @ViewChild('sidenavID', {static: true}) sidenav: MatSidenav;

  constructor(public dialog: MatDialog ,public router: Router, public authservice : AuthService, private studentService : StudentService) {




  }
  ngOnInit() {
    this.authservice.name.subscribe((name) => {
      this.user = name
    })
    this.user = localStorage.getItem("user")
  this.superusers = this.studentService.getSuperUser()





  }



  isLargeScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (localStorage.getItem("token") === null ) {

      return false

    } else {


     return true


    }
  }

  export()
{
  const dialogRef = this.dialog.open(ExcelWindowComponent, {
    width: '550px',

  });

  dialogRef.afterClosed().subscribe(result => {


  });
}

logout()
{

  localStorage.removeItem("auth");
  localStorage.removeItem("user");
  localStorage.removeItem("token")
  this.router.navigate(['/'])

 this.sidenav.close();




}
getAuth(){
  return this.superusers.includes(this.user)
}




}//Class 
