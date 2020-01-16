import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';




@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  constructor(public authService : AuthService) { }




  ngOnInit() {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  
  }

  login(form : NgForm){

    user == form.value.email

    if (form.invalid){
      return
    }

    this.authService.login(form.value.email, form.value.password)




  }

}
export var user:string
