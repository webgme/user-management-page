/* jshint node:true*/
/**
 * @author kecso / https://github.com/kecso
 */

var gmeConfig = require('./config'),
    webgme = require('webgme'),
    myServer;

webgme.addToRequireJsPaths(gmeConfig);

myServer = new webgme.standaloneServer(gmeConfig);

myServer.start(function() {
    console.log('server started');
});
