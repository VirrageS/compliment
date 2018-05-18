import { Map, Set } from 'immutable';

import ActionTypes from '../actions/actionTypes';

const initialState = Map({
  old: Set([1]),
  new: Set([2]),
});

export default function reducer(state = initialState, action) {
    console.log('devices action!: ', action);
    switch (action.type) {
        case ActionTypes.devicesAdd:
            const updatedNew = state.get('new').add(action.id);
            return state.set('new', updatedNew);
        default:
            return state;
  }
}