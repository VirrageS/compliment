import ACTION_TYPES from './actionTypes';

export const addLocalPin = (pin) => ({
  type: ACTION_TYPES.addLocalPin,
  pin,
});
