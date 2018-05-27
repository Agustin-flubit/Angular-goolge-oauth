import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as userActions from '../actions/users-actions';
import { UserService } from '../../../core/user/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../core/user/user';
import { NotificationsService } from '../../../core/notifications/notifications.service';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private notificationsService: NotificationsService
    ) {}

    @Effect()
    loadAll$: Observable<Action> = this.actions$
        .ofType(userActions.UsersActionTypes.LOAD_ALL)
        .switchMap(() => this.userService.load())
        .map((users: User[]) => new userActions.LoadAllSuccess(users));

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(userActions.UsersActionTypes.LOAD)
        .map((action: userActions.Load ) => action.payload)
        .switchMap((id) => this.userService.loadOne(id))
        .map((user: User) => new userActions.LoadSuccess(user));

    @Effect()
    create$: Observable<Action> = this.actions$
        .ofType(userActions.UsersActionTypes.CREATE)
        .map((actiion: userActions.Create) =>  actiion.payload)
        .switchMap((user: User) => {
            return this.userService.create(user)
            .map((response: User) => new userActions.CreateSuccess(response))
            .catch((err: HttpErrorResponse) => {
                return Observable.of(new userActions.Failure({concern: 'CREATE', error: err.error}));
            });
        });

    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(userActions.UsersActionTypes.PATCH)
        .map((actiion: userActions.Patch) =>  actiion.payload)
        .switchMap((user: User) => {
            return this.userService.update(user)
            .map((updatedUser: User) => new userActions.PatchSuccess({
                id: updatedUser.id,
                changes: updatedUser
            }))
            .catch((err: HttpErrorResponse) => {
                return Observable.of(new userActions.Failure({concern: 'PATCH', error: err.error}));
            });
        });
}
