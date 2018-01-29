var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    devtool: "source-map",
    target: "web",
    entry: {
        "force": [APP_DIR + '/force.coffee']
    },

    output: {
        path: BUILD_DIR,
        filename: '[name].dev.js'
    },

    resolve: {
        extensions: ['.js', '.coffee']
    },

    module: {
        rules: [
            {
                test: /\.coffee/,
                exclude: /node_modules/,
                loader: 'coffee-loader'
            }
        ]
    },
};

module.exports = config;
