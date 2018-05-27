import {Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import * as fromRoot from '../../store';
import * as fromUsers from '../store';
import * as userActions from '../store/actions/users-actions';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { User } from '../../core/user/user';
import { Observable } from 'rxjs/Observable';
import { ActionsSubject, Store } from '@ngrx/store';
import { NotificationsService } from '../../core/notifications/notifications.service';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  redirectSubscription: Subscription;
  validationErrors: Observable<Object>;

  constructor(
    private store: Store<fromRoot.State>,
    private actionSubject: ActionsSubject,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(fromUsers.getCurrentUser);
    this.validationErrors = this.store.select(fromUsers.getErrors);

    this.redirectSubscription = this.actionSubject.pipe(
      ofType(userActions.UsersActionTypes.PATCH_SUCCESS)
    )
    .subscribe((action: userActions.CreateSuccess) => {
      this.notificationService.open('User updated successfully.');
      this.router.navigate(['/users']);
    });

    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new userActions.Load(+params['userId']));
    });
  }

  ngOnDestroy() {
    this.redirectSubscription.unsubscribe();
  }

  submit(user: User) {
    this.store.dispatch(new userActions.Patch(user));
  }
}
