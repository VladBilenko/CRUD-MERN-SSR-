const addHeaders = (req, res, next) => {
    res.set(
        'Content-Security-Policy',
        'default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\''
    );
    next();
};

export default addHeaders;