import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertComponent } from './form/insert.component';
import { SuiviComponent } from './suivi/suivi.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import {AuthGuard} from './auth.guard';
import { ChartComponent } from './chart/chart.component';
import { AuthMsgComponent } from './auth-msg/auth-msg.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { ThankComponent } from './thank/thank.component'
import { SelectDatabaseComponent } from './select-database/select-database.component'



const routes: Routes = [
  { path: 'suivi', component: SuiviComponent, canActivate : [AuthGuard],canLoad :[AuthGuard] },
  { path: 'insert', component: InsertComponent },
  { path: '', component: LoginPageComponent },
  { path: 'sign', component: SignupPageComponent },
  { path: 'chart', component: ChartComponent, canActivate : [AuthGuard]  },
  { path: 'auth', component: AuthMsgComponent   },
  { path: 'evaluation', component: EvaluationComponent   },
  { path: 'thank', component: ThankComponent   },
  { path: '', component: LoginPageComponent   },
  { path: 'select', component: SelectDatabaseComponent   }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
