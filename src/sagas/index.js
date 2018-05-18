import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import devicesSaga from './devices';

export default function* indexSaga() {
    yield all([
        call(devicesSaga),
    ]);
    // yield call(devicesSaga);
}