import {jwtConf} from '../server-config';
import mongoose from 'mongoose';
import getRawErrorResponse from './error-response.helper';

const RefreshToken = mongoose.model('RefreshToken');

const sendUserToken = async function(res, user) {
    const {username} = user;

    await RefreshToken.deleteOne({username});

    const accessToken = user.generateJWT(jwtConf.accessTokenExpTimeMilliseconds);
    const refreshToken = user.generateJWT(jwtConf.refreshTokenExpTimeMilliseconds);

    try {
        await new RefreshToken({username, value: refreshToken}).save();

        res.send({username, accessToken, refreshToken});
    } catch (e) {
        getRawErrorResponse(res, 'Invalid token.', e)
    }
};

export default sendUserToken;