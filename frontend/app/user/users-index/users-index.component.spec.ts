import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersIndexComponent } from './users-index.component';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromUsers from '../store';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { NotificationsStub } from '../../testing/stubs/notifications-stub.service';
import { RouterStub } from '../../testing/stubs/router-stub.service';
import { Router } from '@angular/router';

describe('UsersIndexComponent', () => {
  let component: UsersIndexComponent;
  let store: Store<fromUsers.UsersState>;
  let fixture: ComponentFixture<UsersIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        StoreModule.forRoot({
          users: combineReducers(fromUsers.reducers)
        })
      ],
      declarations: [UsersIndexComponent],
      providers: [
        {provide: NotificationsService, useClass: NotificationsStub},
        {provide: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersIndexComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
