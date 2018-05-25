import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../../core/user/user';

import {
    UsersActionTypes,
    All as AllUsersActions
} from '../actions/users-actions';

// This adapter will allow is to manipulate users (CRUD operations)
export const usersAdapter = createEntityAdapter<User>({
    selectId: (user: User) => user.id,
    sortComparer: false
});

export interface State extends EntityState<User> {}

export const INIT_STATE: State = usersAdapter.getInitialState();

export function reducer (
    state: State = INIT_STATE,
    {type, payload}: AllUsersActions
) {
    switch (type) {
        case UsersActionTypes.LOAD_ALL_SUCCESS : {
            return usersAdapter.addAll(payload, state);
        }

        default:
            return state;
    }
}

