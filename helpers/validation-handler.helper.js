import getRawErrorResponse from './error-response.helper';

const handleValidationError = function(err, res) {
    // Duplicating identifiers
    if (err.code === 11000) {
        const [key, value] = Object.entries(err.keyValue)[0];
        return getRawErrorResponse(res, `Field '${key}' with value '${value}' is already exists.`, err);
    }

    if (err.message) {
        return getRawErrorResponse(res, err.message, err)
    }

    return getRawErrorResponse(res, `Validation error.`, err);
};

export default handleValidationError;