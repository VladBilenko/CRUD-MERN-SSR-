import mongoose from "mongoose";
import {sendUserToken, handleValidationError} from '../../../helpers';
import {userRoles} from '../../../constants';

const User = mongoose.model('User');

const signUp = async function (req, res, next) {
    const {username, password} = req.body;

    try {
        const newUser = new User({username, role: userRoles.User});
        newUser.setPassword(password);
        await newUser.save();
        await sendUserToken(res, newUser);
    } catch (e) {
        handleValidationError(e, res);
    }
};

export default signUp;