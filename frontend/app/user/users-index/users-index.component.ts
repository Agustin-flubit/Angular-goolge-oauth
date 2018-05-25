import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../core/user/user';
import * as fromRoot from '../store';
import * as fromUserActions from '../store/actions/users-actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersIndexComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(public store: Store<fromRoot.UsersState>) {
    this.users$ = this.store.select(fromRoot.getAllUsers);
  }

  ngOnInit() {
    this.store.dispatch(new fromUserActions.LoadAll());
  }

}
