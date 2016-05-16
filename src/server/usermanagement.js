/**
 * @author kecso / https://github.com/kecso
 */

'use strict';

var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser');

function serveFile(fileName, res) {
    var options = {
        root: './dist/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    res.sendFile(fileName, options, function (err) {
        if (err) {
            logger.error('Falied to send ' + fileName, err);
            res.status(err.status).end();
        }
    });
}

function initialize(middlewareOpts) {
    var logger = middlewareOpts.logger.fork('UserManagementPage'),
    //gmeConfig = middlewareOpts.gmeConfig,
        ensureAuthenticated = middlewareOpts.ensureAuthenticated;

    logger.debug('initializing ...');

    router.use(bodyParser.json({}));
    router.use(bodyParser.urlencoded({extended: true}));
    router.use('*', function (req, res, next) {
        // TODO: set all headers, check rate limit, etc.
        res.setHeader('X-WebGME-Media-Type', 'webgme.v2');
        next();
    });

    router.get('/', function (req, res) {
        serveFile('index.html', res);
    });

    router.get('/:name', function (req, res) {
        serveFile(req.params.name, res);
    });

    logger.debug('ready');
}

module.exports = {
    initialize: initialize,
    router: router
};