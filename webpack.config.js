/**
 * @author kecso / https://github.com/kecso
 */

var webpack = require('webpack');

module.exports = {
    context: __dirname + '/src/client',
    entry: {main: './main.jsx'},
    output: {
        path: './dist/',
        filename: '[name].js',
        publicPath: ''
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    }
};
