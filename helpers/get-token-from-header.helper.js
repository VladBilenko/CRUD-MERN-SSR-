const REQUIRED_PREFIXES = ['Token', 'Bearer'];

function checkPrefix(string) {
    return REQUIRED_PREFIXES.some(searchedWord => string === searchedWord);
}

const getTokenFromHeader = function(req) {
    const {authorization} = req.headers;

    if (!authorization) {
        return null;
    }

    const [prefix, token] = authorization.split(' ');

    return checkPrefix(prefix) ? token : null;
};

export default getTokenFromHeader;

