import {call, put} from "redux-saga/effects";
import {api} from "../../../services";
import {push} from "connected-react-router";

const authWorkers = {
    handleAuth,
    handleLogout
};

function* handleAuth({data}) {
    try {
        yield call(api.signIn, data);
        yield put(push('/notations'))
    } catch (e) {
        console.error(e);
    }
}

function* handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    yield put(push('/sign-in'));
}

export default authWorkers;
