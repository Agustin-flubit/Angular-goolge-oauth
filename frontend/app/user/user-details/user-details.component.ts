import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as fromUsers from '../store';
import * as fromRoot from '../../store';
import * as userActions from '../store/actions/users-actions';
import { User } from '../../core/user/user';
import { Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';
import 'rxjs/add/operator/filter';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  user$: Observable<User>;
  redirectSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionsSubject: ActionsSubject
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(fromUsers.getCurrentUser);

    this.redirectSubscription = this.actionsSubject.pipe(
      ofType(userActions.UsersActionTypes.DELETE_SUCCESS),
      filter((action: userActions.DeleteSuccess) =>
      action.payload === +this.activatedRoute.snapshot.params['userId'])
    ).subscribe(_ => this.router.navigate(['/users']));

    this.activatedRoute.params.subscribe(params => {
      this.store.dispatch(new userActions.Load(+params['userId']));
    });
  }

  ngOnDestroy() {
    this.redirectSubscription.unsubscribe();
  }

  editUser(user: User) {
    this.store.dispatch(new userActions.SetCurrentUserId(user.id));
    this.router.navigate(['/users', user.id, 'edit']);
  }

  deleteUser(user: User) {
    const confirmed = confirm('Are you sure?');
    if (confirmed) {
      this.store.dispatch(new userActions.Delete(user.id));
    }
  }
}
