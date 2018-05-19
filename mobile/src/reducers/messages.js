import { Map, Set, List } from 'immutable';
import ActionTypes from '../actions/actionTypes';

const initialState = List([0, 1, 2, 3]);

export default function reducer(state = initialState, action) {
  return state;
};
