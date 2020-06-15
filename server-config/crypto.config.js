const cryptoConf = {
    encodingType: 'hex',
    randomBytesSize: 16,
    iterations: 1000, // Set more to provide more secure password crypt
    keylen: 512,
    digest: 'sha512'
};

export default cryptoConf;