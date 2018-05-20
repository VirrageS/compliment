function getMessages(user, timestamp) {
  return fetch(`http://localhost:8080/messages/?user=${user}&timestamp=${timestamp}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

function getBroadcastMessages(user, timestamp) {
  return fetch(`http://localhost:8080/broadcast_messages/?user=${user}&timestamp=${timestamp}`, {
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
