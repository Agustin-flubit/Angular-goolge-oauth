import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { ApiService } from '../api/api.service';
import { ApiStub } from '../../testing/stubs/api-stub';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {provide: ApiService, useClass: ApiStub}
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
