import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { addDevice } from '../actions/devices';

function* changeTheState() {
    // yield put(addDevice(10));
    // yield put(addDevice(11));
    // yield put(addDevice(12));
}

export default function* devicesSaga() {
    yield call(changeTheState);
    // yield call(console.log, 'devices saga test');
}