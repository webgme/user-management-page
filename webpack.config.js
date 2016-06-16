/**
 * @author kecso / https://github.com/kecso
 * @author pmeijer / https://github.com/pmeijer
 */

var webpack = require('webpack'),
    path = require('path'),
    SRC_DIR = path.join(__dirname, 'src/client'),
    DIST_DIR = path.join(__dirname, 'dist');

module.exports = {
    entry: {
        main: path.join(SRC_DIR, 'main.jsx')
    },
    output: {
        path: DIST_DIR,
        filename: '[name].js',
        publicPath: ''
    },
    module: {
        loaders: [
            {test: /^((?!config).)*\.(js|jsx)$/, exclude: path.join(__dirname, 'node_modules'), loader: 'babel-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(jpg|png)$/, loader: 'file-loader'},

            // **IMPORTANT** This is needed so that each bootstrap js file required by
            // bootstrap-webpack has access to the jQuery object
            {test: /bootstrap\/js\//, loader: 'imports-loader?jQuery=jquery'},

            // Loader for react-select's less stylesheet
            {test: /\.less$/, loader: 'style!css!less'},

            // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
            // loads bootstrap's css.

            // Configure font-awesome loaders
            {test: /\.woff(2)?(\?v=\d\.\d\.\d)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.(ttf|eot|svg)(\?v=\d\.\d\.\d)?$/, loader: "file-loader"}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
        // Will minimize & remove all warnings/errors. Add for production
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
        // Adding this reduces bundle size by over 50% but increases webpack build time
        // new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
