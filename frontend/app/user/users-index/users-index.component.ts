import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { User } from '../../core/user/user';
import { NotificationsService } from '../../core/notifications/notifications.service';

import * as fromRoot from '../store';
import * as userActions from '../store/actions/users-actions';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersIndexComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  private notificationsSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.UsersState>,
    private notificationsService: NotificationsService,
    private actionsSubject: ActionsSubject,
    private router: Router
  ) {
    this.users$ = this.store.select(fromRoot.getAllUsers);
  }

  ngOnInit() {
    this.store.dispatch(new userActions.LoadAll());

    this.notificationsSubscription = this.actionsSubject.pipe(
      ofType(userActions.UsersActionTypes.DELETE_SUCCESS),
    ).subscribe(() => {
      this.notificationsService.open('User Deleted successfully.');
    });
  }

  ngOnDestroy() {
    this.notificationsSubscription.unsubscribe();
  }

  showUser(user: User) {
    this.store.dispatch(new userActions.SetCurrentUserId(user.id));
    this.router.navigate(['/users', user.id]);
  }

  editUser(user: User) {
    this.store.dispatch(new userActions.SetCurrentUserId(user.id));
    this.router.navigate(['/users', user.id, 'edit']);
  }

  removeUser(user: User) {
    const confirmed = confirm('Are you sure?');

    if (confirmed) {
      this.store.dispatch(new userActions.Delete(user.id));
    }
  }

  goToCreateNew($event) {
    this.router.navigate(['/users', 'new']);
  }
 }
