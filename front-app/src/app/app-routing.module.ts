import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { InsertComponent } from './form/insert.component';

import { SuiviComponent } from './suivi/suivi.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
  { path: 'suivi', component: SuiviComponent, canActivate : [AuthGuard],canLoad :[AuthGuard] },
  { path: 'insert', component: InsertComponent,canActivate : [AuthGuard] },
  { path: '', component: LoginPageComponent },
  { path: 'sign', component: SignupPageComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
