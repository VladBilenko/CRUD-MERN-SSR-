import {getRawErrorResponse} from '../helpers';

function authorizationErrorsHandler(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        getRawErrorResponse(res, err.message, err);
        return;
    }
    next();
}

export default authorizationErrorsHandler;