/*jshint node: true*/
/**
 * @author kecso / https://github.com/kecso
 */

var config = require('webgme/config/config.default'),
    path = require('path');

config.server.port = 8888;

config.authentication.enable = true;

config.rest.components = {
    'usermanagement': path.resolve('./src/server/usermanagement')
};

//config.client.appDir = './dist';
module.exports = config;