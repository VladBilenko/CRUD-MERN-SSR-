import mongoose from "mongoose";
import {getRawErrorResponse} from "../../../helpers";
const Notation = mongoose.model('Notation');

const findOneNotation = async function (req, res, next) {
    const {id} = req.params;

    try {
        const notation = await Notation.findOne({_id: id});

        res.send(notation);
    } catch (e) {
        getRawErrorResponse(res, 'Can\'t find notation.', e);
    }
};

export default findOneNotation;