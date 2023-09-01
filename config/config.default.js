/* globals require, __dirname */

/**
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

const config = require('webgme/config/config.default');
const path = require('path');

config.server.port = 8888;
config.mongo.uri = 'mongodb://127.0.0.1:27017/multi';

config.authentication.enable = true;
config.authentication.allowGuests = true;

config.authentication.userManagementPage = path.join(__dirname, '../src/server/usermanagement');

config.rest.components = {
    usermanagement: {
        src: path.resolve('./src/server/usermanagement'),
        mount: 'usermanagement',
    },
};

// config.client.appDir = './dist';
module.exports = config;
