import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromUsers from '../store';
import { UserNewComponent } from './user-new.component';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule, combineReducers } from '@ngrx/store';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { NotificationsStub } from '../../testing/stubs/notifications-stub.service';
import { Router } from '@angular/router';
import { RouterStub } from '../../testing/stubs/router-stub.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserNewComponent', () => {
  let component: UserNewComponent;
  let fixture: ComponentFixture<UserNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          users: combineReducers(fromUsers.reducers)
        })
      ],
      declarations: [ UserNewComponent ],
      providers: [
        {provide: NotificationsService, useClass: NotificationsStub},
        {provide: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
