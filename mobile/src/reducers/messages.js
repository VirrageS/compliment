import { Map, Set, List } from 'immutable';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = List([
  { tagId: 0, from: 'Rysiu', url: 'https://i.iplsc.com/peja/000769RBHLL8BVIW-C122-F4.jpg', timestamp: 1526775001 },
  { tagId: 1, from: 'Rysiu', url: 'https://i.iplsc.com/peja/000769RBHLL8BVIW-C122-F4.jpg', timestamp: 1526775001 },
]);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.addMessage: {
      const newMessages = state.insert(0, action.message);
      return newMessage;
    }
    case ACTION_TYPES.messagesRemove: {
      const newMessages = state.remove(0);
      return newMessages;
    }
    default: {
      return state;
    }
  }
};
