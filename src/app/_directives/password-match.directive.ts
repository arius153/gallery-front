import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';


@Directive({
  selector: '[appPasswordMatch]', 
  providers: [
    { provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi:true}
  ]
})
export class PasswordMatchDirective implements Validator {
  @Input("appPasswordMatch") password?: string;
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    console.log("CIA SITAM DIRECTIVE: " + this.password);
    if (this.password === control.value)
    {
      return null;
    }
    return {
      passwordMatch: true
    }
  }

}
