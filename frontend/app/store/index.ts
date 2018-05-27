import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromLayout from './reducers/layout-reducer';

export interface State {
    layout: fromLayout.LayoutState;
}

export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer
};

export const getLayoutState = createFeatureSelector<fromLayout.LayoutState>('layout');

export const getCurrentTitle = createSelector(getLayoutState, fromLayout.getCurrentTitle);
