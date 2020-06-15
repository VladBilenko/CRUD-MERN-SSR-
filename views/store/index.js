import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from './reducers';
import {createBrowserHistory, createMemoryHistory} from "history";
import rootSaga from "./sagas";

const initialState = !process.env.SERVER ? window.__INITIAL_DATA__ : {};

const history = process.env.SERVER
    ? createMemoryHistory({
        initialEntries: ['/'],
    })
    : createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
    routerMiddleware(history),
    sagaMiddleware
];

const enhancers = [
    applyMiddleware(...middlewares),
];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            shouldHotReload: false,
        })
        : compose;
/* eslint-enable */

const configureStore = () => {
    const store = createStore(
        createRootReducer(history),
        initialState,
        composeEnhancers(...enhancers),
    );

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
};

export {
    configureStore,
    history
};

// window.stores = store;