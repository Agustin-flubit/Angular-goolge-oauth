import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GoogleAuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: GoogleAuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated$.map((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        this.router.navigate(['/signin']);
      }
      return isAuthenticated;
    }).take(1);
  }
}
