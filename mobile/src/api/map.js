import store from '../shared/store';
import { addLocalPin } from '../actions/map';


function sendNewPosition(user, latitude, longitude, timestamp) {
  return fetch('https://mywebsite.com/position/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
      latitude,
      longitude,
      timestamp,
    }),
  });
}

function setMarker(user, message, expiration, latitude, longitude, timestamp) {
  const pin = {
    user,
    message,
    expiration,
    latitude,
    longitude,
    timestamp,
  };
  return fetch('https://google.com/marker/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pin),
  }).finally(() => {
    store.dispatch(addLocalPin(pin));
  });
}

export default {
  sendNewPosition,
  setMarker,
}
