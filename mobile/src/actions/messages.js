import ACTION_TYPES from './actionTypes';

export const addMessage = (message) => ({
  type: ACTION_TYPES.addMessage,
  message,
});

export const removeMessage = () => ({
  type: ACTION_TYPES.removeMessage,
});

export const addBroadcastMessage = () => ({
  type: ACTION_TYPES.addBroadcastMessage,
})

export const removeBroadcastMessage = () => ({
  type: ACTION_TYPES.removeBroadcastMessage,
})
