import ActionTypes from "../../action-types";
import {takeEvery} from "redux-saga/effects";
import workers from "../workers";

const {notation: {LoadAll, LoadOne, Create, Delete, Update}} = ActionTypes;

const {notation: {handleAll, handleOne, handleCreate, handleUpdate, handleDelete}} = workers;

const notationWatchers = [
    watchLoadAll,
    watchOne,
    watchCreate,
    watchUpdate,
    watchDelete
];

function* watchLoadAll() {
    yield takeEvery(LoadAll, handleAll);
}

function* watchOne() {
    yield takeEvery(LoadOne, handleOne);
}

function* watchCreate() {
    yield takeEvery(Create, handleCreate);
}

function* watchUpdate() {
    yield takeEvery(Update, handleUpdate);
}

function* watchDelete() {
    yield takeEvery(Delete, handleDelete);
}

export default notationWatchers;