
import { Action } from '@ngrx/store';
import { User } from '../../../core/user/user';
import { Update } from '@ngrx/entity/src/models';

export enum UsersActionTypes {
    LOAD_ALL = '[Uers] LOAD ALL',
    LOAD_ALL_SUCCESS = '[Users] LOAD ALL SUCCESS',

    LOAD = '[Users] LOAD',
    LOAD_SUCCESS = '[Users] LOAD SUCCESS',

    CREATE = '[Users] CREATE',
    CREATE_SUCCESS = '[Users] CREATE SUCCESS',

    PATCH = '[Users] PATCH',
    PATCH_SUCCESS = '[Users] PATCH SUCCESS',

    DELETE = '[Users] DELETE',
    DELETE_SUCCESS = '[Users] DELETE SUCCESS',

    FAILURE = '[Users] FAILURE',

    SET_CURRENT_USER_ID = '[Users] SET CURRENT USER ID',
}
export class SetCurrentUserId implements Action {
    readonly type = UsersActionTypes.SET_CURRENT_USER_ID;
    constructor(public payload: number) {}
}
export class LoadAll implements Action {
    readonly type = UsersActionTypes.LOAD_ALL;
    constructor(public payload = null) {}
}

export class Load implements Action {
    readonly type = UsersActionTypes.LOAD;
    constructor(public payload: number) {}
}

export class Create implements Action {
    readonly type = UsersActionTypes.CREATE;
    constructor(public payload: User) {}
}

export class Delete implements Action {
    readonly type = UsersActionTypes.DELETE;
    constructor(public payload: number) {}
}
export class Patch implements Action {
    readonly type = UsersActionTypes.PATCH;
    constructor(public payload: User) {}
}
export class LoadAllSuccess implements Action {
    readonly type = UsersActionTypes.LOAD_ALL_SUCCESS;
    constructor(public payload: User[]) {}
}
export class LoadSuccess implements Action {
    readonly type = UsersActionTypes.LOAD_SUCCESS;
    constructor(public payload: User) {}
}

export class CreateSuccess implements Action {
    readonly type = UsersActionTypes.CREATE_SUCCESS;
    constructor(public payload: User) {}
}

export class PatchSuccess implements Action {
    readonly type = UsersActionTypes.PATCH_SUCCESS;
    constructor(public payload: Update<User>) {}
}
export class DeleteSuccess implements Action {
    readonly type = UsersActionTypes.DELETE_SUCCESS;
    constructor(public payload: number) {}
}

export class Failure implements Action {
    readonly type = UsersActionTypes.FAILURE;
    constructor (public payload: {concern: 'CREATE' | 'PATCH', error: any}) {}
}

export type All =
    | SetCurrentUserId
    | LoadAll
    | Load
    | Create
    | Patch
    | Delete
    | LoadAllSuccess
    | LoadSuccess
    | PatchSuccess
    | CreateSuccess
    | DeleteSuccess
    | Failure;
