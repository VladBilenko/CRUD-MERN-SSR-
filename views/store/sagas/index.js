import {fork, all} from 'redux-saga/effects';
import watchers from "./watchers";

function* rootSaga() {
    yield all(combineAndForkWatchers(watchers));
}

function combineAndForkWatchers(watchersList) {
    return watchersList.map(watcher => fork(watcher));
}

export default rootSaga;
