import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import {
  AuthService,
  GoogleLoginProvider,
  SocialUser
} from 'angular5-social-login';

import { NotificationsService } from '../notifications/notifications.service';


@Injectable()
export class GoogleAuthService {
  private readonly  MSG_LOGIN_SUCCESS = `You are now logged in.`;
  private readonly MSG_LOGIN_ERROR = `Error Login. Try again`;
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
    const token = localStorage.getItem('token');
    this.isAuthStatus = token ? true : false;

    if (this.isAuthStatus) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

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
        localStorage.setItem('user', JSON.stringify(userData));
        this.notificationService.open(this.MSG_LOGIN_SUCCESS);
        this.isAuthStatus = true;
        this.isAuthenticated.next(true);
        this.user$.next(this.user);
        this.router.navigate(['']);
      }
    ).catch(() => {
      this.notificationService.open(this.MSG_LOGIN_ERROR);
      this.router.navigate(['/signin']);
    });
  }

  logout(): void {
    this.socialAuthService.signOut().then(() => {
      this.deleteUser();
      this.notificationService.open(this.MSG_LOGOUT_SUCCESS);
      this.router.navigate(['/signin']);
    });
  }

  deleteUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthStatus = false;
    this.isAuthenticated.next(false);
    this.user$.next(this.user);
    this.user = null;
  }
}
