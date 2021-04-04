import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatExpansionModule} from '@angular/material/expansion';
import { ChartsModule } from 'ng2-charts';





import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './pages/main/app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, MatMenuModule
  , MatDividerModule, MatInputModule, MatProgressBarModule, MatSidenavModule, MatListModule ,MatDatepickerModule,
  MatNativeDateModule, MatGridListModule, MatSnackBarModule, MatPaginatorModule,MatCheckboxModule,MatRadioModule,MatAutocompleteModule,MatTabsModule
} from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';


import { LoadPipe } from './pipes/load.pipe';
import { InsertComponent } from './pages/form/insert.component';
import { StudentService } from './services/students.service';
import { SuiviComponent } from './pages/suivi/suivi.component';
import { DialogOverviewExampleDialog } from './pages/dialog/dialog.component';
import { MsgConfirmComponent } from './pages/msg-confirm/msg-confirm.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ExcelService } from './services/execl.service';
import { ExcelWindowComponent } from './pages/excel-window/excel-window.component';
import { ChartComponent } from './pages/chart/chart.component';
import { EncadreurComponent } from './pages/encadreur/encadreur.component';
import { MsgErrorComponent } from './pages/msg-error/msg-error.component';
import { AuthMsgComponent } from './pages/auth-msg/auth-msg.component';
import { EvaluationDialogComponent } from './pages/evaluation-dialog/evaluation-dialog.component';
import { PDFService} from './services/pdf.Service';
import { EvaluationComponent } from './pages/evaluation/evaluation.component';
import { ClipboardModule } from 'ngx-clipboard';
import { ThankComponent } from './pages/thank/thank.component';
import { SelectDatabaseComponent } from './pages/select-database/select-database.component';




const material = [MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, MatMenuModule
  , MatDividerModule, MatInputModule, MatProgressBarModule, MatSidenavModule, MatListModule,MatCheckboxModule,MatRadioModule,MatAutocompleteModule,MatTooltipModule, MatTabsModule];
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
    EncadreurComponent,
    MsgErrorComponent,
    AuthMsgComponent,
    EvaluationDialogComponent,
    EvaluationComponent,
    ThankComponent,
    SelectDatabaseComponent
  ],
    entryComponents: [DialogOverviewExampleDialog, MsgConfirmComponent, ExcelWindowComponent,EncadreurComponent,MsgErrorComponent,EvaluationDialogComponent] ,
  imports: [
    BrowserModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    AppRoutingModule,
    ...material,
    BrowserAnimationsModule,
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
