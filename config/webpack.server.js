const path = require('path');
const nodeExternals = require('webpack-node-externals');

const rules = require('./rules');

const nodeConf = {
    target: 'node',
    entry: './bin/www.js',
    externals: [nodeExternals(), 'react-helmet'],
    output: {
        path: path.resolve('build'),
        filename: 'server.js',
        library: 'app',
        libraryTarget: 'commonjs2',
        publicPath: '/',
    },
    module: {
        rules,
    },
    plugins: [
    ],
    resolve: {
        modules: [
            path.resolve('./app'),
            path.resolve(process.cwd(), 'node_modules'),
        ],
        extensions: [
            '.js',
            '.jsx',
            '.react.js',
        ],
        mainFields: [
            'browser',
            'jsnext:main',
            'main',
        ],
    },
};

module.exports = [nodeConf];