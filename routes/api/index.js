import express from 'express';

import auth from './auth';
import users from './users';
import notations from './notations';

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/notations', notations);

export default router;
