import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSidenav } from '@angular/material';
import { ExcelWindowComponent } from '../excel-window/excel-window.component';
import {AuthGuard} from '../../guard/auth.guard';
import { AuthService } from '../../services/auth.service';
import { StudentService} from '../../services/students.service'





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user : string
  auth = [AuthGuard]
  superusers : string[]
  defaultType = "0"
  isHidden : boolean

  @ViewChild('sidenavID', {static: true}) sidenav: MatSidenav;

  constructor(public dialog: MatDialog ,public router: Router, public authservice : AuthService, private studentService : StudentService) {
     this.isHidden = true
     this.defaultType = localStorage.getItem("type") || '0'
     
  }
  ngOnInit() {
    this.disableScrolling()
    this.authservice.name.subscribe((name) => {
      this.user = name
    })
    this.user = localStorage.getItem("user")
  this.superusers = this.studentService.getSuperUser()





  }



  isLargeScreen() {
    this.isHidden = false
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
this.studentService.selectSide('false')
  localStorage.removeItem("auth");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem('type')
  this.router.navigate(['/'])
  this.isHidden = true

 this.sidenav.close();




}
getAuth(){
  return this.superusers.includes(this.user)
}

changeType(type : string){
  
  
 this.studentService.setType(type)
 localStorage.setItem("type", type)
 this.defaultType = localStorage.getItem("type")
 
 location.reload();

}

disableScrolling(){
  var x=window.scrollX;
  var y=window.scrollY;
  window.onscroll=function(){window.scrollTo(x, y);};
}




}//Class
