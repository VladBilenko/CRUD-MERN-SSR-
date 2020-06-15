import 'babel-polyfill';

import express from 'express';
import cors from "cors";
import compression from 'compression';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import connectWithDB from './models';

import {authorizationErrorsHandler} from './middlewares';

import api from './routes/api';
import home from './routes';
import addHeaders from "./middlewares/add-headers.middleware";

/**
 * Create Express app instance.
 */
const app = express();

/**
 * Set up server app initial settings.
 */
app.use(addHeaders);
app.use(cors({origin: 'http://localhost:3001'}));
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public', {index: false}));

connectWithDB();

/**
 * Set up routes.
 */
app.use('/api', api);
app.use('/', home);

/**
 * Set up error handlers.
 */
app.use(authorizationErrorsHandler);

export default app;