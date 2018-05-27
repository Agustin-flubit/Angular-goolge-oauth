import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../../core/user/user';

import * as userActions from '../actions/users-actions';

export const usersAdapter = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: false
});

export interface State extends EntityState<User> {
  currentUserId?: number;
  errors: Object;
}

export const INIT_STATE: State = usersAdapter.getInitialState({
  currentUserId: undefined,
  errors: null
});

export function reducer (
  state: State = INIT_STATE,
  {type, payload}: userActions.All
) {
  switch (type) {
    case userActions.UsersActionTypes.SET_CURRENT_USER_ID : {
      return {
        ...state,
        currentUserId: payload,
        errors: undefined
      };
    }

    case userActions.UsersActionTypes.CREATE || userActions.UsersActionTypes.PATCH : {
      return {
        ...state,
        errors: undefined
      };
    }

    case userActions.UsersActionTypes.LOAD_ALL_SUCCESS : {
      return usersAdapter.addAll(payload, {
        ...state,
        errors: undefined
      });
    }

    case userActions.UsersActionTypes.LOAD_SUCCESS || userActions.UsersActionTypes.CREATE_SUCCESS : {
      return usersAdapter.addOne(payload, {
        ...state,
        currentUserId: payload.id,
        errors: undefined
      });

    }

    case userActions.UsersActionTypes.PATCH_SUCCESS : {
      return usersAdapter.updateOne(payload, {
        ...state,
        errors: undefined
      });
    }

    case userActions.UsersActionTypes.DELETE_SUCCESS : {
      return usersAdapter.removeOne(payload, state);
    }

    case userActions.UsersActionTypes.FAILURE: {
      return {
        ...state,
        errors: payload.error
      };
    }

    default: return state;
  }
}

export const getCurrentUserId = (state: State) => state.currentUserId;
export const getErrors = (state: State) => state.errors;
