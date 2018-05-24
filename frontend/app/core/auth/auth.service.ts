import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser
} from 'angular5-social-login';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class GoogleAuthService {
  private readonly  MSG_LOGIN_SUCCESS = `You are now logged in.`;
  private readonly  MSG_LOGOUT_SUCCESS = `You are now logged out.`;
  private isAuthenticated: BehaviorSubject<boolean>;
  private user: SocialUser;
  private user$: BehaviorSubject<SocialUser>;
  private isAuthStatus = false;

  isAuthenticated$: Observable<boolean>;

  constructor(
    private socialAuthService: AuthService,
    private notificationService: NotificationsService,
    private router: Router
  ) {
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
        this.notificationService.open(this.MSG_LOGIN_SUCCESS);
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
      this.notificationService.open(this.MSG_LOGOUT_SUCCESS);
      this.router.navigate(['/sign-in']);
    });
  }
}
