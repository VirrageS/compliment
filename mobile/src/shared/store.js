import createStore from '../reducers';

const { store, callback } = createStore();
callback();

export default store;
