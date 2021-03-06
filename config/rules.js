const rules = [
    {
        test: /\.jsx?$/,
        exclude: /(node_modules|app[/\\]+libs.*)/,
        use: {
            loader: 'babel-loader',
        },
    },
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            'isomorphic-style-loader',
            {
                loader: 'css-loader?modules=false',
                options: {
                    importLoaders: 1,
                    modules: {
                        localIdentName: process.env.NODE_ENV !== 'production' ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
                    },
                },
            },
            'sass-loader',
        ],
    },
    {
        test: /\.css$/,
        include: /(node_modules|app)/,
        use: ['isomorphic-style-loader', 'css-loader?modules=false'],
    },
    {
        test: /\.(gif)$/,
        use: 'file-loader',
    },
    {
        test: /\.(jpe?g|png|ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'base64-inline-loader?limit=1000&name=[name].[ext]',
    },
    {
        test: /\.html$/,
        use: 'html-loader',
    },
    {
        test: /\.(mp4|webm|gif)$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: true,
            },
        },
    },
];

module.exports = rules;
