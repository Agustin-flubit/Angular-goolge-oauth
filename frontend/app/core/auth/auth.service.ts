import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser
} from 'angular5-social-login';

@Injectable()
export class GoogleAuthService {
  private isAuthenticated: BehaviorSubject<boolean>;
  private user: SocialUser;
  private user$: BehaviorSubject<SocialUser>;
  private isAuthStatus = false;

  isAuthenticated$: Observable<boolean>;

  constructor(private socialAuthService: AuthService, private router: Router) {
    this.isAuthStatus = false;
    this.isAuthenticated = new BehaviorSubject(this.isAuthStatus);

    this.isAuthenticated$ = this.isAuthenticated.asObservable();
    this.user$ = new BehaviorSubject<SocialUser>(this.user);
  }

  getCurrentUser() {
    return this.user$.asObservable();
  }

  login() {
    const socialPlatformProvider  = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.user = userData;
        localStorage.setItem('token', userData.idToken);
        this.isAuthStatus = true;
        this.isAuthenticated.next(true);
        this.user$.next(this.user);
        this.router.navigate(['']);
      }
    );
  }

  logout(): void {
    this.socialAuthService.signOut().then(() => {
      localStorage.removeItem('token');
      this.isAuthenticated.next(false);
      this.user = null;
      this.user$.next(this.user);
      this.router.navigate(['/sign-in']);
    });
  }
}
