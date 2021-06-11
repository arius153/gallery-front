import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInfo } from '../_models/login-info';
import { AutheticationService } from '../_services/authetication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  showErrorMessage = false;

  model = new LoginInfo;

  constructor(private authService: AutheticationService, private router: Router) { }

  onSubmit(form: NgForm, event: Event) {
    event.preventDefault();
    if (form.valid)
    {
      this.authService.login(this.model).subscribe(x => {
        this.router.navigate(['search']);
      }, (error) => {
        this.showErrorMessage = true;

      });
    }
    
  }

}
