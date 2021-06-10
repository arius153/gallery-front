import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutheticationService } from '../_services/authetication.service';

@Directive({
  selector: '[appUsernameTaken]',
  providers: [
    {provide: NG_ASYNC_VALIDATORS, useExisting: UsernameTakenDirective, multi:true }
  ]
})
export class UsernameTakenDirective implements AsyncValidator {

  constructor(private authService: AutheticationService) { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const obs = this.authService.isUsernameTaken(control.value).pipe(
      map((isUsed) => {
        return !isUsed ? null : {
          usernameTaken: true
        }
      })
    )
    return obs;
  }

}
