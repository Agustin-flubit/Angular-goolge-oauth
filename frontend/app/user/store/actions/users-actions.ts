
import { Action } from '@ngrx/store';
import { User } from '../../../core/user/user';
import { Update } from '@ngrx/entity/src/models';

export enum UsersActionTypes {
    LOAD_ALL = '[Uers] LOAD ALL',
    LOAD_ALL_SUCCESS = '[Users] LOAD ALL SUCCESS',

    FAILURE = '[Users] FAILURE'
}

export class LoadAll implements Action {
    readonly type = UsersActionTypes.LOAD_ALL;
    constructor(public payload = null) {}
}

export class LoadAllSuccess implements Action {
    readonly type = UsersActionTypes.LOAD_ALL_SUCCESS;
    constructor(public payload: User[]) {}
}

export type All =
    | LoadAll
    | LoadAllSuccess;
