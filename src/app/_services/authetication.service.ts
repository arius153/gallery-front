import { Injectable, ɵresetJitOptions } from '@angular/core';
import { SignUpInfo } from '../_models/sign-up-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInfo } from '../_models/login-info';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LogOutDTO } from '../_models/log-out-dto';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { RefreshDTO } from '../_models/refresh-dto';


@Injectable({
  providedIn: 'root'
})
export class AutheticationService {


  private authUrl = 'http://localhost:8080/authentication';


  constructor(private http: HttpClient, private router: Router) { }

  register(userInfo: LoginInfo) {
    return this.http.post(this.authUrl + "/signup", userInfo, { responseType: 'text' });
  }

  login(userInfo: LoginInfo) {
    return this.http.post(this.authUrl + "/login", userInfo).pipe(
      tap(res => {
        this.setSession(res);
      })
    );
  }

  private setSession(authResult: any) {

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', new Date(authResult.expires).toString());
    localStorage.setItem('roles', authResult.roles);
    localStorage.setItem('refresh_token', authResult.refreshToken);

  }

  logout() {
    var refreshToken = localStorage.getItem("refresh_token")
    if (refreshToken) {
      this.http.post(this.authUrl + "/logout", new LogOutDTO(refreshToken)).subscribe();
    }
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("roles");
    localStorage.removeItem("refresh_token");
    this.router.navigate(['login']);
  }

  public isLoggedIn() {

    if (localStorage.getItem("refresh_token")) {
      return true;

    }
    return false;
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }


  getExpiration(): string {

    const expiration = localStorage.getItem("expires_at");
    if (expiration == null) {
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

  public refreshToken() {
    var refreshToken = localStorage.getItem("refresh_token");
    var jwt = localStorage.getItem("id_token");

    return this.http.post<any>(this.authUrl + "/refresh", {'jwt': this.getJwtToken(), 'refreshToken': this.getRefreshToken()}).pipe(tap(x => {
      localStorage.setItem('id_token', x.token);
      localStorage.setItem('expires_at', new Date(x.expires).toString());
      localStorage.setItem('refresh_token', x.refreshToken);
    }), catchError((this.handleError<boolean>("refresh", false))));
  }

  private getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  private getJwtToken() {
    return localStorage.getItem("id_token");
  }


  private handleRefreshError<T>(operation = 'refresh', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // console.log(`${operation} failed: ${error.message}`);
      this.logout();
      location.reload();
      return of(result as T);
    };
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // // TODO: better job of transforming error for user consumption
      // console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  isExpired() {
    return (new Date) > new Date(this.getExpiration());
  }

  isUsernameTaken(username: string): Observable<boolean>
  {
    return this.http.post<boolean>(this.authUrl + "/checkUser",  username);
  }
}
