var testFixture = require('webgme/test/_globals');

// This flag will make sure the config.test.js is being used
// process.env.NODE_ENV = 'test'; // This is set by the require above, overwrite it here.

var WebGME = testFixture.WebGME;

testFixture.getGmeConfig = WebGME.getGmeConfig;

module.exports = testFixture;
