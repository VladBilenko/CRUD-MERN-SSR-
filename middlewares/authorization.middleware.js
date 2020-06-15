import {getRawErrorResponse, getTokenFromHeader} from '../helpers';
import * as jwt from 'jsonwebtoken';
import {jwtConf} from '../server-config';

const authorizationMiddleware = function(req, res, next) {
    const accessToken = getTokenFromHeader(req);

    jwt.verify(accessToken, jwtConf.secret, (err, obj) => {
        if (err) {
            return getRawErrorResponse(res, 'Invalid token.', err);
        }

        // @todo check, where is good to store user cred and update all controllers
        req.params.user = obj;
        next();
    });
};

export default authorizationMiddleware;