import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(public authService : AuthService) { }

  ngOnInit() {


  }

  login(form : NgForm){

    //console.log(form.value)
    this.authService.createUser(form.value.email, form.value.password)
  }

}
