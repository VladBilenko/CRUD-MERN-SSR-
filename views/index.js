import React from 'react';
import {hydrate, render} from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './service-worker';
import {ConnectedRouter} from 'connected-react-router';
import {
    ReduxAsyncConnect,
} from 'redux-connect';
import StyleContext from 'isomorphic-style-loader/StyleContext';

import {configureStore, history} from './store/index';
import {loadableRoutes} from "./routes/loadable-routes";
import rootSaga from "./store/sagas";

const renderApp = process.env.NODE_ENV === 'production' ? hydrate : render;

const store = configureStore();

store.runSaga(rootSaga);

if (!process.env.SERVER) {
    window['store'] = store;
}

const insertCss = (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(
        style => {
            if (style._insertCss) {
                style._insertCss();
            }
        });
    return () => removeCss.forEach(dispose => {
        if (dispose) {
            dispose()
        }
    });
};

renderApp(
    <StyleContext.Provider value={{insertCss}}>
        <Provider key="provider" store={store}>
            <ConnectedRouter history={history}>
                <ReduxAsyncConnect helpers={{}} routes={loadableRoutes}/>
            </ConnectedRouter>
        </Provider>
    </StyleContext.Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
