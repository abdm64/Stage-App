import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ExcelWindowComponent } from './excel-window/excel-window.component';

declare let ga: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog ,public router: Router) {

    // subscribe to router events and send page views to Google Analytics
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');

      }

    });
  }

  export()
{
  const dialogRef = this.dialog.open(ExcelWindowComponent, {
    width: '550px',
    //data:
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');

  });
}



}
