import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import {
    UsersActionTypes,
    LoadAll,
    LoadAllSuccess
} from '../actions/users-actions';
import { UserService } from '../../../core/user/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../core/user/user';


@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) {}

    @Effect()
    LoadAll$: Observable<Action> = this.actions$
        .ofType(UsersActionTypes.LOAD_ALL)
        .switchMap(() => this.userService.load())
        .map((users: User[]) => new LoadAllSuccess(users));
}
