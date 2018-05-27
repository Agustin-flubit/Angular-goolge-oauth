import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreModule, combineReducers } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';

import { NotificationsService } from '../../core/notifications/notifications.service';
import { NotificationsStub } from '../../testing/stubs/notifications-stub.service';
import { RouterStub } from '../../testing/stubs/router-stub.service';
import { ActivatedRouteStub } from '../../testing/stubs/activated-route-stub';

import { UserDetailsComponent } from './user-details.component';

import * as fromUsers from '../store';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          users: combineReducers(fromUsers.reducers)
        })
      ],
      providers: [
        { provide: NotificationsService, useClass: NotificationsStub },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ],
      declarations: [ UserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
