import {all, takeEvery, put, fork} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import {getToken, clearToken} from '../../helpers/utility';
import actions from './actions';
import axios from 'axios';
const config = require('../../config');


export function* loginRequest() {
    yield takeEvery('LOGIN_REQUEST', function* (data) {

        try {
            const apiUrl = `${config.local_host}:${config.server_port}/api/user/sign_in`;
            const user = yield axios.post(`${apiUrl}`, {
                email: data.payload.email,
                password: data.payload.password,
            }, {withCredentials: true});

            const token = user.data.token;
            const userData = yield user.data.user;

            yield put({
                type: actions.LOGIN_SUCCESS,
                token: token,
                profile: userData
            });

            return token;

        } catch (error) {

            yield put({type: 'LOGIN_ERROR', error})

        }

    });
}

export function* loginSuccess() {
    yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
        yield localStorage.setItem('id_token', payload.token);
        yield sessionStorage.setItem('login_credentias', JSON.stringify(payload));
    });
}

export function* loginError() {
    yield takeEvery(actions.LOGIN_ERROR, function* () {
    });
}

export function* logout() {
    yield takeEvery(actions.LOGOUT, function* () {
        clearToken();
        yield put(push('/'));
    });
}

export function* checkAuthorization() {
    yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
        const token = getToken().get('idToken');
        if (token) {
            yield put({
                type: actions.LOGIN_SUCCESS,
                token,
                profile: 'Profile'
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(checkAuthorization),
        fork(loginRequest),
        fork(loginSuccess),
        fork(loginError),
        fork(logout)
    ]);
}
