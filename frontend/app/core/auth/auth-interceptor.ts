import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { GoogleAuthService } from './auth.service';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: GoogleAuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });

    return next.handle(request).do((event: HttpEvent<any>) => {
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authService.deleteUser();
          this.router.navigate(['signin']); // In case any unauthenticated request
        }
      }
    });
  }
}
