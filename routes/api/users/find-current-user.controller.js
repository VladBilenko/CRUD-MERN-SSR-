import mongoose from "mongoose";
const User = mongoose.model('User');

const findCurrentUser = async function (req, res, next) {
    const {username} = req.params;
    const user = await User.findOne({username});
    const rawUser = user ? user.toPublicVersion() : `User wih '${username}' username, does not exist.`;
    res.send(rawUser);
};

export default findCurrentUser;