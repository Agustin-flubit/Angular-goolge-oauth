import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserEditComponent } from './user-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule, combineReducers } from '@ngrx/store';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { NotificationsStub } from '../../testing/stubs/notifications-stub.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterStub } from '../../testing/stubs/router-stub.service';
import { ActivatedRouteStub } from '../../testing/stubs/activated-route-stub';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as fromUsers from '../store';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

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
      declarations: [UserEditComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
