import {Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';

import * as fromRoot from '../../store';
import * as fromUsers from '../store';
import * as userActions from '../store/actions/users-actions';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { User } from '../../core/user/user';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from '../../core/notifications/notifications.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNewComponent implements OnInit, OnDestroy {
  redirectSubscription: Subscription;
  validationErrors: Observable<Object>;

  constructor(
    private store: Store<fromRoot.State>,
    private actionSubject: ActionsSubject,
    private router: Router,
    private notificationsService: NotificationsService
  ) {

   }

  ngOnInit() {
    this.validationErrors = this.store.select(fromUsers.getErrors);
    this.redirectSubscription = this.actionSubject.pipe(
      ofType(userActions.UsersActionTypes.CREATE_SUCCESS)
    )
    .subscribe((action: userActions.CreateSuccess) => {
      this.notificationsService.open('User created successfully.');
      this.router.navigate(['/users']);
    });
  }

  ngOnDestroy() {
    this.redirectSubscription.unsubscribe();
  }

  submit(user: User) {
    this.store.dispatch(new userActions.Create(user));
  }
}
