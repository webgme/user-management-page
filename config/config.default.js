/*jshint node: true*/
/**
 * @author kecso / https://github.com/kecso
 */

var config = require('webgme/config/config.default');

config.server.port = 8778;

config.rest.components = {
    'usermanagement': './../../../../dist/usermanagement'
};

config.client.appDir = './dist';
module.exports = config;