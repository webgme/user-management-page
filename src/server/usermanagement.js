/**
 * @author kecso / https://github.com/kecso
 */

'use strict';

var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    logger;

function serveFile(fileName, res) {
    var options = {
        root: './dist/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    logger.info('serving file', fileName);
    res.sendFile(fileName, options, function(err) {
        if (err) {
            logger.error('Failed to send ' + fileName, err);
            res.status(err.status).end();
        }
    });
}

function initialize(middlewareOpts) {
    var ensureAuthenticated = middlewareOpts.ensureAuthenticated;

    logger = middlewareOpts.logger.fork('UserManagementPage');
    logger.debug('initializing ...');

    router.use(bodyParser.json({}));
    router.use(bodyParser.urlencoded({extended: true}));
    router.use('*', function(req, res, next) {
        // TODO: set all headers, check rate limit, etc.
        res.setHeader('X-WebGME-Media-Type', 'webgme.v2');
        next();
    });

    // Detecting if its a file name
    router.get(/\./, function(req, res) {
        var onlyFileExtension = req.originalUrl.match(/[^\/]+$/)[0]; // this is the file name
        serveFile(onlyFileExtension, res);
    });

    const ROUTES = ['/', '/projects', '/profile', '/organizations', /\/projects\/\w+\/\w+$/, /\/organizations\/\w+$/];
    router.get(ROUTES, function(req, res) {
        serveFile('index.html', res);
    });

    logger.debug('ready');
}

module.exports = {
    initialize: initialize,
    router: router
};
