import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AutheticationService } from '../_services/authetication.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AutheticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('id_token');

    if (idToken) {
      request = this.addToken(request, idToken);
    }
    return next.handle(request).pipe(catchError(error => {
      if (error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        this.authService.logout();
        return throwError(error);
      }
      
    }));

  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.token);
          return next.handle(this.addToken(request, token.token));
        })
        );

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

}
