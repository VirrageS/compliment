import { Map, Set } from 'immutable';

import ACTION_TYPES from '../actions/actionTypes';

const initialState = Map({
  localPins: Set([]),
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.addLocalPin:
      const updateLocal = state.get('localPins').add(action.pin);
      return state.set('localPins', updateLocal);
    default:
      return state;
  }
}
