import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from 'angular5-social-login';
import { GoogleAuthService } from './auth.service';
import { NotificationsService } from '../notifications/notifications.service';

import { NotificationsStub } from '../../testing/stubs/notifications-stub.service';
import { RouterStub } from '../../testing/stubs/router-stub.service';
import { AuthStub } from '../../testing/stubs/auth-stub';

describe('AuthService', () => {
  let googleAuthService: GoogleAuthService;
  let notificationsService: NotificationsService;
  let authService: AuthService;
  let router: Router;
  let notificationSpy: any;
  let routerSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleAuthService,
        { provide: AuthService, useClass: AuthStub },
        { provide: NotificationsService, useClass: NotificationsStub},
        { provide: Router, useClass: RouterStub}
      ]
    });

    googleAuthService = TestBed.get(GoogleAuthService);
    authService = TestBed.get(AuthService);
    notificationsService = TestBed.get(NotificationsService);
    router = TestBed.get(Router);
    notificationSpy = spyOn(notificationsService, 'open');
    routerSpy = spyOn(router, 'navigate');
  });

  describe('login()', () => {
    const socialUserResponse = {
      provider: 'google',
      email: 'test@test.com',
      name: 'test',
      image: 'http://test.png',
      token: '',
      idToken: '90900900909090900909'
    };

    it('should add a notification if the user successfully logs in', fakeAsync(() => {
      const authSpy = spyOn(authService, 'signIn').and.returnValue(Promise.resolve(socialUserResponse));
      googleAuthService.login();
      tick();
      expect(notificationSpy).toHaveBeenCalledWith('You are now logged in.');
    }));

    it('should redirect to the root route if the user successfully logs in and no redirect route is specified', fakeAsync(() => {
      const authSpy = spyOn(authService, 'signIn').and.returnValue(Promise.resolve(socialUserResponse));
      googleAuthService.login();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['']);
    }));

    it('should add a notification error if the user is not logs in', fakeAsync(() => {
      const authSpy = spyOn(authService, 'signIn').and.returnValue(Promise.reject('Error'));
      googleAuthService.login();
      tick();
      expect(notificationSpy).toHaveBeenCalledWith('Error Login. Try again');
    }));

    it('should redirect to the sigin if the user is not successfully logs in', fakeAsync(() => {
      const authSpy = spyOn(authService, 'signIn').and.returnValue(Promise.reject('Error'));
      googleAuthService.login();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['/signin']);
    }));
  });

  describe('logout()', () => {
    it('should add a notification if the user successfully logs out', fakeAsync(() => {
      const authSpy = spyOn(authService, 'signOut').and.returnValue(Promise.resolve(null));
      googleAuthService.logout();
      tick();
      expect(notificationSpy).toHaveBeenCalledWith('You are now logged out.');
    }));

    it('should redirect to the sigin if the user is  successfully logs out', fakeAsync(() => {
      const authSpy = spyOn(authService, 'signOut').and.returnValue(Promise.resolve(null));
      googleAuthService.logout();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['/signin']);
    }));
  });
});
