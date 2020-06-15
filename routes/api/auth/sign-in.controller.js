import {getRawErrorResponse, sendUserToken} from '../../../helpers';
import mongoose from 'mongoose';
const User = mongoose.model('User');

const signIn = async function (req, res, next) {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});

        if (!user || !user.validatePassword(password)) {
            return getRawErrorResponse(res, `Login or password are invalid.`);
        }

        await sendUserToken(res, user);
    } catch (e) {
        getRawErrorResponse(res, `Login or password are invalid.`, e);
    }
};

export default signIn;