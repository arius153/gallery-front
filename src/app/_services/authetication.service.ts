import { Injectable, ɵresetJitOptions } from '@angular/core';
import { SignUpInfo } from '../_models/sign-up-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInfo } from '../_models/login-info';
import { catchError, map, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  private authUrl = 'http://localhost:8080/authentication';


  constructor(private http: HttpClient) { }

  register(userInfo: LoginInfo){
   return this.http.post(this.authUrl + "/signup", userInfo, {responseType: 'text'});
  }

  login(userInfo: LoginInfo) {
    return this.http.post(this.authUrl + "/login", userInfo).pipe(
      tap(res => {
        this.setSession(res);
        console.log(res);
      })
    );
  }

  private setSession(authResult: any) {
      
      localStorage.setItem('id_token', authResult.token);
      localStorage.setItem('expires_at', new Date(authResult.expires).toString());
      localStorage.setItem('roles', authResult.roles);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("roles");
  }

  public isLoggedIn() {
      return (new Date) < new Date(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
  

  getExpiration(): string {

    const expiration = localStorage.getItem("expires_at");
    if (expiration == null)
    {
      return '';
    }
    return expiration;
  }

  isAdmin(): boolean {
    let roles = localStorage.getItem("roles");
    if (roles?.includes("ROLE_ADMIN"))
      return true;
    return false;
  }

}
