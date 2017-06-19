var testFixture = require('webgme/test/_globals'),
    WEBGME_CONFIG_PATH = '../config';

// This flag will make sure the config.test.js is being used
// process.env.NODE_ENV = 'test'; // This is set by the require above, overwrite it here.

var WebGME = testFixture.WebGME,
    gmeConfig = require(WEBGME_CONFIG_PATH),
    _logger,
    getGmeConfig = function getGmeConfig() {
        // makes sure that for each request it returns with a unique object and tests will not interfere
        if (!gmeConfig) {
            // if some tests are deleting or unloading the config
            gmeConfig = require(WEBGME_CONFIG_PATH);
            WebGME.addToRequireJsPaths(gmeConfig);
        }

        return JSON.parse(JSON.stringify(gmeConfig));
    };

WebGME.addToRequireJsPaths(gmeConfig);
testFixture.getGmeConfig = getGmeConfig;

module.exports = testFixture;
