import mongoose from "mongoose";
import {getRawErrorResponse} from "../../../helpers";
const Notation = mongoose.model('Notation');

const findAllNotations = async function (req, res, next) {
    const {id} = req.params.user;

    try {
        const notations = await Notation.find({userId: id});

        res.send(notations);
    } catch (e) {
        getRawErrorResponse(res, 'Can\'t find notations.', e);
    }
};

export default findAllNotations;