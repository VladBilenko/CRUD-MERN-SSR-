import express from 'express';

import {check}  from "express-validator";
import {authorization, requestErrorsHandler}  from "../../../middlewares";

import createNotation  from './create-notation.controller';
import findAllNotations  from './find-all-notation.controller';
import findOneNotation  from './find-one-notation.controller';
import updateNotation  from './update-notation.controller';
import deleteNotation  from './delete-notation.controller';

const router = express.Router();

const NOTATION_VALIDATORS = [
    check('title').notEmpty().isString().isLength({min: 3, max: 20}),
    check('description').isString().isLength({max: 254}),
    check('expiresAt').notEmpty().isString(),
    check('completed').notEmpty().isBoolean(),
];

router.get('/', authorization, findAllNotations);

router.get('/:id', authorization, findOneNotation);

router.post('/', authorization, NOTATION_VALIDATORS, requestErrorsHandler, createNotation);

router.put('/:id', authorization, NOTATION_VALIDATORS, requestErrorsHandler, updateNotation);

router.delete('/:id', authorization, deleteNotation);

export default router;
