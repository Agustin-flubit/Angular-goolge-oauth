import * as layoutActions from '../actions/layout-actions';

export interface LayoutState {
  currentTitle: string;
}

export const INIT_UI_STATE: LayoutState = {
  currentTitle: undefined
};


export function reducer(state: LayoutState = INIT_UI_STATE, {type, payload}: layoutActions.All): LayoutState {

  switch (type) {

    case layoutActions.SET_CURRENT_TITLE : {
      return Object.assign({}, state, {currentTitle: payload});
    }

    default : {
      return state;
    }
  }
}

export const getCurrentTitle = (state: LayoutState) => state.currentTitle;
