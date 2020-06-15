import mongoose from "mongoose";
import {getRawErrorResponse} from "../../../helpers";
const Notation = mongoose.model('Notation');

const deleteNotation = async function (req, res, next) {
    const {id} = req.params;

    try {
        await Notation.deleteOne({_id: id});

        res.send('Notation deleted.');
    } catch (e) {
        getRawErrorResponse(res, 'Can\'t delete notations.', e);
    }
};

export default deleteNotation;