var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    devtool: "source-map",
    target: "web",
    entry: {
        "app": [APP_DIR + '/app.ts']
    },

    output: {
        path: BUILD_DIR,
        filename: '[name].dev.js'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
};

module.exports = config;
