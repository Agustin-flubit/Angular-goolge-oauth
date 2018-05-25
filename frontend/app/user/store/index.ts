import * as fromUsers from './reducers/users-reducer';
import {createFeatureSelector, createSelector, ActionReducerMap} from '@ngrx/store';

export interface UsersState  {
    users: fromUsers.State;
}

export const reducers = {
    users: fromUsers.reducer
};

export const getUsersRootState = createFeatureSelector<UsersState>('users');

export const getUsersState = createSelector(
    getUsersRootState,
    state => state.users
);

export const {
    selectAll: getAllUsers,
    selectEntities: getUsersEntities
} = fromUsers.usersAdapter.getSelectors(getUsersState);
