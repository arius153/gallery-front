import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUpInfo } from '../_models/sign-up-info';
import { AutheticationService } from '../_services/authetication.service'
import { LoginInfo } from '../_models/login-info';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  model = new SignUpInfo;
  loginInfo = new LoginInfo;

  constructor(private authService: AutheticationService) { }

  onSubmit(form: NgForm) {
    
    this.loginInfo.password = this.model.password;
    this.loginInfo.username = this.model.username;
    this.authService.register(this.loginInfo).subscribe(x => console.log(x));
  }


}
