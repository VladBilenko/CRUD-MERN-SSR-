import express from 'express';
import {check} from 'express-validator';
import {requestErrorsHandler} from '../../../middlewares';
import signIn from './sign-in.controller';
import signUp from './sign-up.controller';
import refreshToken from './refresh-token.controller';

const router = express.Router();

const USER_CREDENTIALS_VALIDATORS =
    [
        check('username').notEmpty().isString().isLength({min: 5, max: 20}),
        check('password').notEmpty().isString().isLength({min: 3, max: 20})
    ];

router.post('/sign-in', USER_CREDENTIALS_VALIDATORS, requestErrorsHandler, signIn);

router.post('/sign-up', USER_CREDENTIALS_VALIDATORS, requestErrorsHandler,  signUp);

router.post('/refresh-token', refreshToken);

export default router;