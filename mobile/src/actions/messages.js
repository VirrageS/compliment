import ACTION_TYPES from './actionTypes';

export const addMessage = (message) => ({
  type: ACTION_TYPES.addMessage,
  message,
});

export const removeMessage = () => ({
  type: ACTION_TYPES.removeMessage,
});

export const addBroadcastMessage = (message) => ({
  type: ACTION_TYPES.addBroadcastMessage,
  message,
})

export const removeBroadcastMessage = () => ({
  type: ACTION_TYPES.removeBroadcastMessage,
})
