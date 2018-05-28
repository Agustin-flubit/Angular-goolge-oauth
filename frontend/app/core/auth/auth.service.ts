import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {
  SocialUser
} from 'angular5-social-login';

import { NotificationsService } from '../notifications/notifications.service';

import { environment } from '../../../environments/environment';

declare let gapi: any;

@Injectable()
export class GoogleAuthService {
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
    this.googleInitialize().then((userData) => {
        if (userData) {
          this.user = userData;
          localStorage.setItem('token', userData.idToken);
          localStorage.setItem('user', JSON.stringify(userData));
          this.notificationService.open(this.MSG_LOGIN_SUCCESS);
          this.isAuthStatus = true;
          this.isAuthenticated.next(true);
          this.user$.next(this.user);
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/signin']);
        }
      }
    ).catch(() => {
      this.notificationService.open(this.MSG_LOGIN_ERROR);
      this.router.navigate(['/signin']);
    });
  }

  getCurrentUser() {
    return this.user$.asObservable();
  }

  login() {
    this.googleSignIn().then((userData) => {
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
      this.notificationService.open(this.MSG_LOGIN_ERROR);
    });
  }

  logout(): void {
    this.googleSignOut().then(() => {
      this.googleRevokeUserScope();
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

  private googleRevokeUserScope() {
    this.auth2.disconnect();
  }

  private googleInitialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: environment.google_auth_client_id,
          scope: 'email profile openid'
        });

        this.auth2.then(() => {
          if (this.auth2.isSignedIn.get()) {
            resolve(this.drawUser());
          } else {
            resolve(null);
          }
        }).catch(err => {
          reject(err);
        })
      });
    });
  }

  private drawUser(): SocialUser {
    const user: SocialUser = new SocialUser();
    const profile = this.auth2.currentUser.get().getBasicProfile();
    const authResponseObj = this.auth2.currentUser.get().getAuthResponse(true);
    user.id = profile.getId();
    user.name = profile.getName();
    user.email = profile.getEmail();
    user.image = profile.getImageUrl();
    user.token = authResponseObj.access_token;
    user.idToken = authResponseObj.id_token;
    return user;
  }

  private googleSignIn(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      const promise = this.auth2.signIn({
        prompt: 'select_account'
      });
      promise.then(() => {
        resolve(this.drawUser());
      });
    });
  }

  private googleSignOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth2.signOut().then((err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
