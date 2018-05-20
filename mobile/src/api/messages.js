function getMessages(user, timestamp) {
  return fetch(`https://google.com/marker?user=${user}&timestamp=${timestamp}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export default {
  getMessages,
}
