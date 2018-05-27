import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthInterceptor } from './auth-interceptor';
import { UserService } from '../user/user.service';
import { ApiService } from '../api/api.service';
import { RouterStub } from '../../testing/stubs/router-stub.service';
import { environment } from '../../../environments/environment';
import { GoogleAuthService } from './auth.service';

describe('AuthInterceptor', () => {
  const mockAuthService = {
    tokenType: 'fake',
    tokenValue: 'fake',
    deleteUser: () => {}
  };

  let httpMock: HttpTestingController;
  let userService: UserService;
  let http: HttpClient;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        ApiService,
        {
          provide: GoogleAuthService,
          useValue: mockAuthService
        },
        { provide: Router, useClass: RouterStub },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
    userService = TestBed.get(UserService);
    router = TestBed.get(Router);
  });

  afterEach( () => {
    httpMock.verify();
  });

  describe('making http calls', () => {
    it('adds Authorization header', () => {
      userService.load().subscribe(users => {
        expect(users).toBeTruthy();
      });

      const httpRequest = httpMock.expectOne(`${environment.apiBase}/users`);

      expect(httpRequest.request.headers.has('Authorization'));

      httpRequest.flush({ hello: 'world' });
      httpMock.verify();
    });

    it('redirect when 401 to signin page', () => {
      const routerSpy = spyOn(router, 'navigate');

      userService.load().subscribe(_ => {}, () => {
        expect(routerSpy).toHaveBeenCalledWith(['/signin']);
      });

      const httpRequest = httpMock.expectOne(`${environment.apiBase}/users`);

      httpRequest.flush({errorMessage: 'Uh oh!'}, { status: 401, statusText: 'Server Error'});
      httpMock.verify();
    });
  });
});
