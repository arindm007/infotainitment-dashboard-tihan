const path = require('path');

module.exports = {
    entry: './src/index.js', // Adjust the entry point as needed
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.html'],
    },
};