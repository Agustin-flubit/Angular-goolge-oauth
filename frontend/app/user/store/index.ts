import * as fromUsers from './reducers/users-reducer';
import {createFeatureSelector, createSelector, ActionReducerMap} from '@ngrx/store';
import { FormGroup } from '@angular/forms';

export interface UsersState  {
    users: fromUsers.State;
    form: FormGroup;
}

export const reducers = {
    users: fromUsers.reducer
};

export const getUsersRootState = createFeatureSelector<UsersState>('users');

export const getUsersState = createSelector(
    getUsersRootState,
    state => state.users
);

export const getSelectedUserId = createSelector(
    getUsersState,
    fromUsers.getCurrentUserId
);

export const getErrors = createSelector(
    getUsersState,
    fromUsers.getErrors
);

export const {
    selectAll: getAllUsers,
    selectEntities: getUsersEntities
} = fromUsers.usersAdapter.getSelectors(getUsersState);

export const getCurrentUser = createSelector(
    getUsersEntities,
    getSelectedUserId,
    (entities, id) => id && entities[id]
);
