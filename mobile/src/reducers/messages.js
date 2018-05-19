import { Map, Set, List } from 'immutable';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = List([0, 1, 2, 3]);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.messagesRemove: {
      const newMessages = state.remove(0);
      return newMessages;
    }
    default: {
      return state;
    }
  }
};
