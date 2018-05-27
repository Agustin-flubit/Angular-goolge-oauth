import { TestBed, inject } from '@angular/core/testing';

import { GoogleAuthService } from './auth.service';
import { AuthService } from 'angular5-social-login';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsStub } from '../../testing/stubs/notifications-stub.service';
import { GoogleAuthStub } from '../../testing/stubs/google-auth-stub';
import { RouterStub } from '../../testing/stubs/router-stub.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleAuthService,
        { provide: AuthService, useClass: GoogleAuthStub },
        { provide: NotificationsService, useClass: NotificationsStub},
        { provide: Router, useClass: RouterStub}
      ]
    });
  });

  it('should be created', inject([GoogleAuthService], (service: GoogleAuthService) => {
    expect(service).toBeTruthy();
  }));
});
