import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as userActions from '../actions/users-actions';
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
    loadAll$: Observable<Action> = this.actions$
        .ofType(userActions.UsersActionTypes.LOAD_ALL)
        .switchMap(() => this.userService.load())
        .map((users: User[]) => new userActions.LoadAllSuccess(users));

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(userActions.UsersActionTypes.LOAD)
        .map( (action: userActions.Load ) => action.payload)
        .switchMap((id) => this.userService.loadOne(id))
        .map((contact: User) => new userActions.LoadSuccess(contact));
}
