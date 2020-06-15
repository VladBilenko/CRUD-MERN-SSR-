import express from 'express';
import {authorization} from '../../../middlewares';

import findAllUsers from './find-all-users.controller';
import findCurrentUser from './find-current-user.controller';

const router = express.Router();

router.get('/', authorization, findAllUsers);

router.get('/:username', authorization, findCurrentUser);

export default router;
