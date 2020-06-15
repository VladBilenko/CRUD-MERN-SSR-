import mongoose from "mongoose";
import {getRawErrorResponse} from "../../../helpers";

const User = mongoose.model('User');
const Notation = mongoose.model('Notation');

const createNotation = async function (req, res, next) {
    const {id} = req.params.user;
    const {title, description, expiresAt, completed} = req.body;

    try {
        const newNotation = new Notation({
            userId: id,
            title,
            description,
            expiresAt,
            completed
        });

        const notationId = newNotation._id;

        const user = await User
            .findOne({_id: id});

        user.addNotation(notationId).save();

        await newNotation.save();

        res.send(newNotation);
    } catch (e) {
        getRawErrorResponse(res, 'Can\'t create notation.', e);
    }
};

export default createNotation;