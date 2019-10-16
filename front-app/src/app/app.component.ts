import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ExcelWindowComponent } from './excel-window/excel-window.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user : String

  constructor(public dialog: MatDialog ,public router: Router) {

    // subscribe to router events and send page views to Google Analytics
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {


      }

    });
  }
  ngOnInit() {

    this.user = localStorage.getItem("user") ;
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
 // location.reload()




}



}
