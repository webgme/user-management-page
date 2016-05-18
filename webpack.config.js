/**
 * @author kecso / https://github.com/kecso
 * @author pmeijer / https://github.com/pmeijer
 */

var webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: {main: path.join(__dirname, '/src/client/main.jsx')},
    output: {
        path: './dist/',
        filename: '[name].js',
        publicPath: ''
    },
    module: {
        loaders: [
            {test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.jpg$/, loader: 'file-loader'},

            // **IMPORTANT** This is needed so that each bootstrap js file required by
            // bootstrap-webpack has access to the jQuery object
            {test: /bootstrap\/js\//, loader: 'imports-loader?jQuery=jquery'},

            // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
            // loads bootstrap's css.
            {test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot$/, loader: "file-loader"},
            {test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml"}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$":        "jquery",
            "jQuery":   "jquery"
        })
    ]
};
