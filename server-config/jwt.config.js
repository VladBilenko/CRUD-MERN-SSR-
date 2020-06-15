const jwtConf = {
    secret: process.NODE_ENV === 'production' ? process.secret : 'DEV_SECRET_KEY',
    accessTokenExpTimeMilliseconds: 5 * 60 * 1000, // @todo in future set to 1 hour
    refreshTokenExpTimeMilliseconds: 24 * 60 * 60 * 1000,
};

export default jwtConf;