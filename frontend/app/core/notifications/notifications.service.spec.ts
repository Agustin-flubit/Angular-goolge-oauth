import { TestBed, inject } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';
import { MaterialModule } from '../../shared/material/material.module';

describe('NotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [NotificationsService]
    });
  });

  it('should be created', inject([NotificationsService], (service: NotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
