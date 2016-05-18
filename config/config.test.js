/*jshint node: true*/
/**
 * @author kecso / https://github.com/kecso
 */

var config = require('webgme/config/config.default'),
    path = require('path');

config.server.port = 9001;
config.mongo.uri = 'mongodb://127.0.0.1:27017/webgme_tests';

config.authentication.enable = true;

config.rest.components = {
    'usermanagement': path.resolve('./src/server/usermanagement')
};

module.exports = config;