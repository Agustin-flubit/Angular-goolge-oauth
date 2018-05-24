import { TestBed, inject } from '@angular/core/testing';

import { GoogleAuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleAuthService]
    });
  });

  it('should be created', inject([GoogleAuthService], (service: GoogleAuthService) => {
    expect(service).toBeTruthy();
  }));
});
