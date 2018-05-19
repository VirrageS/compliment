import { Map, Set } from 'immutable';

import ACTION_TYPES from '../actions/actionTypes';

const initialState = Map({
  old: Set([1]),
  new: Set([2]),
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.devicesAdd:
      const updatedNew = state.get('new').add(action.id);
      return state.set('new', updatedNew);
    default:
      return state;
  }
}
