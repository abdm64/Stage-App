import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatExpansionModule} from '@angular/material/expansion';
import { ChartsModule } from 'ng2-charts';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, MatMenuModule
  , MatDividerModule, MatInputModule, MatProgressBarModule, MatSidenavModule, MatListModule ,MatDatepickerModule,
  MatNativeDateModule,MatGridListModule, MatSnackBarModule
} from '@angular/material';

import { HomeComponent } from './home/home.component';
import { LoadPipe } from './home/load.pipe';
import { GraphQLModule } from './graphql.module';
import { InsertComponent } from './form/insert.component';
import { StudentService } from './students.service';
import { FetchComponent } from './fetch/fetch.component';
import { SuiviComponent } from './suivi/suivi.component';
import { DialogOverviewExampleDialog } from './dialog/dialog.component';
import { MsgConfirmComponent } from './msg-confirm/msg-confirm.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupPageComponent } from './signup-page/signup-page.component';
import {AuthGuard} from './auth.guard';
import { ExcelService } from './execl.service';
import { ExcelWindowComponent } from './excel-window/excel-window.component';
import { ChartComponent } from './chart/chart.component';
import { FilterPipe } from './filter.pipe';
import { EncadreurComponent } from './encadreur/encadreur.component';



const material = [MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, MatMenuModule
  , MatDividerModule, MatInputModule, MatProgressBarModule, MatSidenavModule, MatListModule];
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomeComponent,
    InsertComponent,
    FetchComponent,
    LoadPipe,
    SuiviComponent,
    DialogOverviewExampleDialog,
    MsgConfirmComponent,
    LoginPageComponent,
    SignupPageComponent,
    ExcelWindowComponent,
    ChartComponent,
    FilterPipe,
    EncadreurComponent
  ],
    entryComponents: [DialogOverviewExampleDialog,MsgConfirmComponent,ExcelWindowComponent,EncadreurComponent] ,
  imports: [
    BrowserModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    AppRoutingModule,
    ...material,
    BrowserAnimationsModule,
    GraphQLModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,

    MatSnackBarModule,
    CommonModule,
    FlexLayoutModule,
    ChartsModule




  ],
  providers: [ StudentService, DatePipe,ExcelService],
  bootstrap: [AppComponent]

})
export class AppModule {
  constructor() {}
}
