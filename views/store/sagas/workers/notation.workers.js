import {call, put} from "redux-saga/effects";
import {notationService} from "../../../services";
import {push} from "connected-react-router";
import actions from "../../actions";

const {notation: {setAllNotations, setOneNotation}} = actions;

const notationWorkers = {
    handleAll,
    handleOne,
    handleCreate,
    handleUpdate,
    handleDelete
};

function* handleAll() {
    try {
        const {data} = yield call(notationService.fetchAllNotations);
        yield put(setAllNotations(data));
    } catch (e) {
        console.error(e);
    }
}

function* handleOne({payload}) {
    try {
        const {data} = yield call(notationService.fetchNotation, payload);
        yield put(setOneNotation(data));
    } catch (e) {
        console.error(e);
    }
}

function* handleCreate({payload}) {
    try {
        yield call(notationService.createNotation, payload);
        yield put(push('/notations'))
    } catch (e) {
        console.error(e);
    }
}

function* handleUpdate({payload}) {
    try {
        const {_id} = payload;
        yield call(notationService.updateNotation, payload);
        yield put(push(`/notations/${_id}`))
    } catch (e) {
        console.error(e);
    }
}

function* handleDelete({payload}) {
    try {
        yield call(notationService.deleteNotation, payload);
        yield put(push('/notations'));
    } catch (e) {
        console.error(e);
    }
}

export default notationWorkers;
