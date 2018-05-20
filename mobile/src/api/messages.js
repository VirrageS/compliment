function getMessages(user, timestamp) {
  return fetch(`https://google.com/messages?user=${user}&timestamp=${timestamp}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

function getBroadcastMessages(user, timestamp) {
  return fetch(`https://google.com/messages/broadcast?user=${user}&timestamp=${timestamp}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}


export default {
  getMessages,
  getBroadcastMessages,
}
