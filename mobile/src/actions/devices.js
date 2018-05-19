import ActionTypes from './actionTypes';

export const addDevice = (id) => ({
  type: ActionTypes.devicesAdd,
  id,
});
