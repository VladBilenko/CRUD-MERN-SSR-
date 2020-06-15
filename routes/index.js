import express from 'express';
import React from "react";
import {renderToString} from "react-dom/server";
import fs from 'fs';
import path from 'path';
import {parse as parseUrl} from 'url';
import {ReduxAsyncConnect, loadOnServer} from 'redux-connect'
import {StaticRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "../views/store";
import defaultRoute from "../views/routes/default-route";
import {staticRoutes} from "../views/routes/static-routes";
import StyleContext from 'isomorphic-style-loader/StyleContext';
import rootSaga from "../views/store/sagas";

const router = express.Router();

const routes = [defaultRoute];


/* GET home page. */
router.get('*', async function (req, res) {
    const url = req.originalUrl;
    const location = parseUrl(url);
    const helpers = [];

    const indexFile = path.resolve('./public/index.html');

    const store = configureStore();
    store.runSaga(rootSaga).toPromise().then(async () => {
        await loadOnServer({store, location, routes, helpers});
        const context = {};

        const css = new Set(); // CSS for all rendered React components
        const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

        const appContent = renderToString(
            <StyleContext.Provider value={{insertCss}}>
                <Provider store={store} key="provider">
                    <StaticRouter location={location} context={context}>
                        <ReduxAsyncConnect routes={staticRoutes} helpers={helpers}/>
                    </StaticRouter>
                </Provider>
            </StyleContext.Provider>
        );

        fs.readFile(indexFile, 'utf8', (err, data) => {
            if (err) {
                console.log('Something went wrong:', err);
                return res.status(500).send('Oops, better luck next time!');
            }
            data = data.replace('<div id=root></div>', `<div id=root>${appContent}</div>`);
            data = data.replace('<div id="root"></div>', `<div id="root">${appContent}</div>`);

            return res.send(data);
        });
    });

    store.close();
});

export default router;
