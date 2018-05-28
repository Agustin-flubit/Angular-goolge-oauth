import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {
  SocialUser
} from 'angular5-social-login';

import { NotificationsService } from '../notifications/notifications.service';

import { environment } from '../../../environments/environment';
import { GoogleAuthService } from './google-auth.service';

declare let gapi: any;

@Injectable()
export class AuthService {
  private readonly  MSG_LOGIN_SUCCESS = `You are now logged in.`;
  private readonly MSG_LOGOUT_ERROR = `Error Logging out. Try again`
  private readonly MSG_LOGIN_ERROR = `Error Login. Try again`;
  private readonly  MSG_LOGOUT_SUCCESS = `You are now logged out.`;
  private isAuthenticated: BehaviorSubject<boolean>;
  private user: SocialUser;
  private user$: BehaviorSubject<SocialUser>;
  private isAuthStatus = false;
  private auth2: any;

  isAuthenticated$: Observable<boolean>;

  constructor(
    private notificationService: NotificationsService,
    private googleAuthService: GoogleAuthService,
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

  init() {
    this.googleAuthService.initialize().then((userData) => {
        if (userData) {
          this.user = userData;
          localStorage.setItem('token', userData.idToken);
          localStorage.setItem('user', JSON.stringify(userData));
          this.isAuthStatus = true;
          this.isAuthenticated.next(true);
          this.user$.next(this.user);
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/signin']);
        }
      }
    ).catch(() => {
      this.googleAuthService.revokeUserScope();
      this.deleteUser();
      this.notificationService.open(this.MSG_LOGIN_ERROR);
      this.router.navigate(['/signin']);
    });
  }

  getCurrentUser() {
    return this.user$.asObservable();
  }

  login() {
    this.googleAuthService.signIn().then((userData) => {
      if (userData) {
        this.user = userData;
        localStorage.setItem('token', userData.idToken);
        localStorage.setItem('user', JSON.stringify(userData));
        this.notificationService.open(this.MSG_LOGIN_SUCCESS);
        this.isAuthStatus = true;
        this.isAuthenticated.next(true);
        this.user$.next(this.user);
        this.router.navigate(['']);
      }
    }).catch(() => {
      this.googleAuthService.revokeUserScope();
      this.deleteUser();
      this.notificationService.open(this.MSG_LOGIN_ERROR);
      this.router.navigate(['/signin']);
    });
  }

  logout(): void {
    this.googleAuthService.signOut().then(() => {
      this.googleAuthService.revokeUserScope();
      this.deleteUser();
      this.notificationService.open(this.MSG_LOGOUT_SUCCESS);
      this.router.navigate(['/signin']);
    }).catch(() => {
      this.notificationService.open(this.MSG_LOGOUT_ERROR);
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
