import { Map, Set, List } from 'immutable';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = Map({
  normal: List([
    { tagId: 0, from: 'Rysiu', url: 'https://i.iplsc.com/peja/000769RBHLL8BVIW-C122-F4.jpg', timestamp: 1526775001 },
    { tagId: 1, from: 'Rysiu', url: 'https://i.iplsc.com/peja/000769RBHLL8BVIW-C122-F4.jpg', timestamp: 1526775001 },
  ]),
  broadcast: List([
    { from: 'Rysiu', url: 'https://i.iplsc.com/peja/000769RBHLL8BVIW-C122-F4.jpg', content: 'Siema', timestamp: 1526775001 },
    { from: 'Rysiu', url: 'https://i.iplsc.com/peja/000769RBHLL8BVIW-C122-F4.jpg', content: 'Co tam', timestamp: 1526775001 },
  ]),
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.addMessage: {
      const newMessages = state.get('normal').insert(0, action.message);
      return state.set('normal', newMessages);
    }
    case ACTION_TYPES.removeMessage: {
      const newMessages = state.get('normal').remove(0);
      return state.set('normal', newMessages);
    }
    case ACTION_TYPES.addBroadcastMessage: {
      const newBroadcastMessages = state.get('broadcast').insert(0, action.message);
      return state.set('broadcast', newBroadcastMessages);
    }
    case ACTION_TYPES.removeBroadcastMessage: {
      const newBroadcastMessages = state.get('broadcast').remove(0);
      return state.set('broadcast', newBroadcastMessages);
    }
    default: {
      return state;
    }
  }
};
