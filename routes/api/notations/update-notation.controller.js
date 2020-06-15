import mongoose from "mongoose";
import {getRawErrorResponse} from "../../../helpers";
const Notation = mongoose.model('Notation');

const updateNotation = async function (req, res, next) {
    const {id} = req.params;
    const {title, description, expiresAt, completed} = req.body;

    try {
        await Notation
            .updateOne({_id: id}, {title, description, expiresAt, completed});

        const updatedNotation = await Notation.findOne({_id: id});

        res.send(updatedNotation);
    } catch (e) {
        getRawErrorResponse(res, 'Can\'t update notation.', e);
    }


};

export default updateNotation;