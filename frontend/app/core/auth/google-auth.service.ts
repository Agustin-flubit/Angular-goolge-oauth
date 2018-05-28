import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { SocialUser } from 'angular5-social-login';

declare let gapi: any;

@Injectable()
export class GoogleAuthService {

  private auth2: any;

  constructor() { }

  initialize(): Promise<SocialUser> {
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

  drawUser(): SocialUser {
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

  signIn(): Promise<SocialUser> {
    this.auth2 = gapi.auth2.getAuthInstance();
    return new Promise((resolve, reject) => {
      const promise = this.auth2.signIn({
        prompt: 'select_account'
      });
      promise.then(() => {
        resolve(this.drawUser());
      });
    });
  }

  signOut(): Promise<any> {
    this.auth2 = gapi.auth2.getAuthInstance();
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

  revokeUserScope() {
    this.auth2.disconnect();
  }
}
