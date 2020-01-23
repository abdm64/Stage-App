import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatExpansionModule} from '@angular/material/expansion';
import { ChartsModule } from 'ng2-charts';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, MatMenuModule
  , MatDividerModule, MatInputModule, MatProgressBarModule, MatSidenavModule, MatListModule ,MatDatepickerModule,
  MatNativeDateModule, MatGridListModule, MatSnackBarModule, MatPaginatorModule,MatCheckboxModule,MatRadioModule,MatAutocompleteModule
} from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';


import { LoadPipe } from './load.pipe';
import { GraphQLModule } from './graphql.module';
import { InsertComponent } from './form/insert.component';
import { StudentService } from './students.service';
import { SuiviComponent } from './suivi/suivi.component';
import { DialogOverviewExampleDialog } from './dialog/dialog.component';
import { MsgConfirmComponent } from './msg-confirm/msg-confirm.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupPageComponent } from './signup-page/signup-page.component';

import { ExcelService } from './execl.service';
import { ExcelWindowComponent } from './excel-window/excel-window.component';
import { ChartComponent } from './chart/chart.component';
import { FilterPipe } from './filter.pipe';
import { EncadreurComponent } from './encadreur/encadreur.component';
import { MsgErrorComponent } from './msg-error/msg-error.component';
import { AuthMsgComponent } from './auth-msg/auth-msg.component';
import { EvaluationDialogComponent } from './evaluation-dialog/evaluation-dialog.component';
import { PDFService} from './pdf.Service';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { ClipboardModule } from 'ngx-clipboard';
import { ThankComponent } from './thank/thank.component';




const material = [MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, MatMenuModule
  , MatDividerModule, MatInputModule, MatProgressBarModule, MatSidenavModule, MatListModule,MatCheckboxModule,MatRadioModule,MatAutocompleteModule,MatTooltipModule];
@NgModule({
  declarations: [
    AppComponent,


    InsertComponent,

    LoadPipe,
    SuiviComponent,
    DialogOverviewExampleDialog,
    MsgConfirmComponent,
    LoginPageComponent,
    SignupPageComponent,
    ExcelWindowComponent,
    ChartComponent,
    FilterPipe,
    EncadreurComponent,
    MsgErrorComponent,
    AuthMsgComponent,
    EvaluationDialogComponent,
    EvaluationComponent,
    ThankComponent
  ],
    entryComponents: [DialogOverviewExampleDialog, MsgConfirmComponent, ExcelWindowComponent,EncadreurComponent,MsgErrorComponent,EvaluationDialogComponent] ,
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
    ClipboardModule,

    MatSnackBarModule,
    CommonModule,
    FlexLayoutModule,
    ChartsModule,
    MatPaginatorModule,





  ],
  providers: [ StudentService, DatePipe,ExcelService,PDFService],
  bootstrap: [AppComponent]

})
export class AppModule {
  constructor() {}
}
