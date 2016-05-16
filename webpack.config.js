/**
 * @author kecso / https://github.com/kecso
 */

var path = require("path"),
    webpack = require("webpack");

module.exports = {
    context: __dirname + "/src/client",
    entry: {main: "./main.jsx"},
    output: {
        path: "./dist/",
        filename: "[name].js",
        publicPath: ""
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react'},
            {test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react'}
        ]
    }
};
