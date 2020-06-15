import {validationResult} from 'express-validator';
import {getRawErrorResponse} from '../helpers';

const requestErrorsHandler = function (req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const {errors} = result;
        const invalidParamsListString = errors
            .reduce((string, {param}) => {
                string += `${param} `;
                return string;
            }, '');
        return getRawErrorResponse(res, `Invalid params: ${invalidParamsListString}`, errors)
    }
    next();
};

export default requestErrorsHandler;