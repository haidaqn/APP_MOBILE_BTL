import { all } from 'redux-saga/effects';
import { authSaga } from '../views/auth/AuthSaga';

export default function* rootSaga() {
    yield all([authSaga()]);
}
