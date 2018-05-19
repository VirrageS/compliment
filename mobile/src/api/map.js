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

function setMarker(user, latitude, longitude, timestamp, expiration) {
  return fetch('https://mywebsite.com/marker/', {
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
      expiration,
    }),
  });
}

export default {
  sendNewPosition,
  setMarker,
}
