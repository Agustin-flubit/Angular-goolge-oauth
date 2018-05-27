import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../core/user/user';
import * as fromRoot from '../store';
import * as userActions from '../store/actions/users-actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersIndexComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(private store: Store<fromRoot.UsersState>, private router: Router) {
    this.users$ = this.store.select(fromRoot.getAllUsers);
  }

  ngOnInit() {
    this.store.dispatch(new userActions.LoadAll());
  }

  showUser(user: User) {
    this.store.dispatch(new userActions.SetCurrentUserId(user.id));
    this.router.navigate(['/users', user.id]);
  }

  editUser(user: User) {
    this.store.dispatch(new userActions.SetCurrentUserId(user.id));
    this.router.navigate(['/users', user.id, 'edit']);
  }
}
