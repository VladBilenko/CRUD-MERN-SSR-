import * as jwt from 'jsonwebtoken';
import {jwtConf} from '../../../server-config';
import {getRawErrorResponse, sendUserToken, getTokenFromHeader} from '../../../helpers';
import mongoose from 'mongoose';

const RefreshToken = mongoose.model('RefreshToken');
const User = mongoose.model('User');

const INVALID_TOKEN_MESSAGE = 'Invalid refresh token.';

const refreshToken = function (req, res, next) {
    const refreshToken = getTokenFromHeader(req);

    jwt.verify(refreshToken, jwtConf.secret, async (err, obj) => {
        if (err) {
            return getRawErrorResponse(res, INVALID_TOKEN_MESSAGE, err);
        }

        const {username} = obj;
        const storedRefreshToken = await RefreshToken.findOne({username});

        if (storedRefreshToken.value !== refreshToken) {
            return getRawErrorResponse(res, INVALID_TOKEN_MESSAGE);
        }

        const user = await User.findOne({username});
        await sendUserToken(res, user);
    });
};

export default refreshToken;