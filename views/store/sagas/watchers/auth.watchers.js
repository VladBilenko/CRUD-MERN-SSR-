import ActionTypes from "../../action-types";
import {takeEvery} from "redux-saga/effects";
import workers from "../workers";

const {auth: {SignIn, SignUp, Logout}} = ActionTypes;

const authWatchers = [
    watchSignIn,
    watchSignUp,
    watchLogout
];

function* watchSignUp() {
    yield takeEvery(SignIn, workers.auth.handleAuth);
}

function* watchSignIn() {
    yield takeEvery(SignUp, workers.auth.handleAuth);
}

function* watchLogout() {
    yield takeEvery(Logout, workers.auth.handleLogout);
}

export default authWatchers;