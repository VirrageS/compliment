import ACTION_TYPES from './actionTypes';

export const addMessage = (message) => ({
  type: ACTION_TYPES.addMessage,
  message,
});

export const removeMessage = () => ({
  type: ACTION_TYPES.messagesRemove,
});
