import AsyncStorage from '@react-native-async-storage/async-storage';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import authApi from '../../apis/auth';
import { StorageKeys } from '../../constants/storage-keys';
import { authActions } from './AuthSlice';

function* handleLogin(action) {
    try {
        const res = yield call(authApi.login, action.payload);
        console.log(res)
        if (res?.success === true) {
            yield put(authActions.loginSuccess(res.userData));
            yield call(AsyncStorage.setItem, StorageKeys.TOKEN, res.accessToken);
            yield call(AsyncStorage.setItem, StorageKeys.USER_ID, res.userData._id);
            yield call(AsyncStorage.setItem, StorageKeys.NAME_USER, res.userData.name);
            yield call(AsyncStorage.setItem, StorageKeys.EMAIL_USER, res.userData.email);
            yield call(AsyncStorage.setItem, StorageKeys.PHONE_USER, res.userData.mobile);
            yield call(AsyncStorage.setItem, StorageKeys.ADDRESS_USER, 'Chưa có địa chỉ');
        } else {
            yield put(authActions.loginFailed());
            yield delay(100);
            yield put(authActions.resetAction());
        }
    } catch (error) {
        console.log(error);
        // Handle the error here
        yield put(authActions.loginFailed());
        yield delay(100);
        yield put(authActions.resetAction());
    }
}
function* handleRegister(action) {
    try {
        const res = yield call(authApi.register, action.payload);
        console.log(res);
        yield put(authActions.registerSuccess(res.user));
        yield call(AsyncStorage.setItem, StorageKeys.USER_ID, res.user._id);
        yield call(AsyncStorage.setItem, StorageKeys.NAME_USER, res.user.name);
        yield call(AsyncStorage.setItem, StorageKeys.EMAIL_USER, res.user.email);
        yield call(AsyncStorage.setItem, StorageKeys.PHONE_USER, res.user.mobile);
    } catch (error) {
        yield put(authActions.registerFailed());
        yield delay(100);
        yield put(authActions.resetAction());
    }
}
function* handleLogout() {
    yield call(AsyncStorage.removeItem, StorageKeys.TOKEN);
    yield call(AsyncStorage.removeItem, StorageKeys.USER);
}

export function* authSaga() {
    yield takeLatest(authActions.login.type, handleLogin);
    yield takeLatest(authActions.register.type, handleRegister);
    yield takeLatest(authActions.logout.type, handleLogout);
}
