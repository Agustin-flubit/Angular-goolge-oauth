import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { NotificationsService } from '../notifications/notifications.service';

import { NotificationsStub } from '../../testing/stubs/notifications-stub.service';
import { RouterStub } from '../../testing/stubs/router-stub.service';
import { AuthStub } from '../../testing/stubs/auth-stub';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthStub } from '../../testing/stubs/google-auth-stub';

describe('AuthService', () => {
  let authService: AuthService;
  let googleAuthService: GoogleAuthService;
  let notificationsService: NotificationsService;
  let router: Router;
  let notificationSpy: any;
  let routerSpy: any;
  let googleAuhStub: GoogleAuthStub;

  beforeEach(() => {
    googleAuhStub = new GoogleAuthStub();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: GoogleAuthService, useValue: googleAuhStub},
        { provide: NotificationsService, useClass: NotificationsStub},
        { provide: Router, useClass: RouterStub}
      ]
    });

    authService = TestBed.get(AuthService);
    googleAuthService = TestBed.get(GoogleAuthService);
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
      const authSpy = spyOn(googleAuthService, 'signIn').and.returnValue(Promise.resolve(socialUserResponse));
      authService.login();
      tick();
      expect(notificationSpy).toHaveBeenCalledWith('You are now logged in.');
    }));

    it('should redirect to the root route if the user successfully logs in and no redirect route is specified', fakeAsync(() => {
      const authSpy = spyOn(googleAuthService, 'signIn').and.returnValue(Promise.resolve(socialUserResponse));
      authService.login();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['']);
    }));

    it('should add a notification error if the user is not logs in', fakeAsync(() => {
      const authSpy = spyOn(googleAuthService, 'signIn').and.returnValue(Promise.reject('Error'));
      authService.login();
      tick();
      expect(notificationSpy).toHaveBeenCalledWith('Error Login. Try again');
    }));

    it('should redirect to the sigin if the user is not successfully logs in', fakeAsync(() => {
      const authSpy = spyOn(googleAuthService, 'signIn').and.returnValue(Promise.reject('Error'));
      authService.login();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['/signin']);
    }));
  });

  describe('logout()', () => {
    it('should add a notification if the user successfully logs out', fakeAsync(() => {
      const authSpy = spyOn(googleAuthService, 'signOut').and.returnValue(Promise.resolve(null));
      authService.logout();
      tick();
      expect(notificationSpy).toHaveBeenCalledWith('You are now logged out.');
    }));

    it('should redirect to the sigin if the user is  successfully logs out', fakeAsync(() => {
      const authSpy = spyOn(googleAuthService, 'signOut').and.returnValue(Promise.resolve(null));
      authService.logout();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['/signin']);
    }));
  });
});
