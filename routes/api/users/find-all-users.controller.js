import mongoose from "mongoose";
const User = mongoose.model('User');

const findAllUsers = async function (req, res, next) {
    const users = await User.find();
    const rawUsers = users.map(user => user.toPublicVersion());
    res.send(rawUsers);
};

export default findAllUsers;