import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../../core/user/user';

import * as userActions from '../actions/users-actions';

// This adapter will allow is to manipulate users (CRUD operations)
export const usersAdapter = createEntityAdapter<User>({
    selectId: (user: User) => user.id,
    sortComparer: false
});

export interface State extends EntityState<User> {
    currentUserId?: number;
}

export const INIT_STATE: State = usersAdapter.getInitialState({
    currentUserId: undefined
});

export function reducer (
    state: State = INIT_STATE,
    {type, payload}: userActions.All
) {
    switch (type) {
        case userActions.UsersActionTypes.SET_CURRENT_USER_ID : {
            return {
              ...state,
              currentUserId: payload
            };
        }

        case userActions.UsersActionTypes.LOAD_ALL_SUCCESS : {
            return usersAdapter.addAll(payload, state);
        }

        case userActions.UsersActionTypes.LOAD_SUCCESS || userActions.UsersActionTypes.CREATE_SUCCESS : {
            return usersAdapter.addOne(payload, {
                ...state,
                currentUserId: payload.id
            });
        }

        case userActions.UsersActionTypes.PATCH_SUCCESS : {
            return usersAdapter.updateOne(payload, state);
        }

        case userActions.UsersActionTypes.DELETE_SUCCESS : {
            return usersAdapter.removeOne(payload, state);
        }

        default: return state;
    }
}

export const getCurrentUserId = (state: State) => state.currentUserId;
