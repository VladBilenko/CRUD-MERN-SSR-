const getRawErrorResponse =  function(res, userErrorMessage, devError = userErrorMessage) {
    return res
        .send({userErrorMessage, devError});
};

export default getRawErrorResponse;