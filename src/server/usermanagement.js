/**
 * @author kecso / https://github.com/kecso
 */

'use strict';

var express = require('express'),
    path = require('path'),
    ejs = require('ejs'),
    fs = require('fs'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    DIST_DIR = path.join(__dirname, '..', '..', 'dist'),
    logger;

function serveFile(fileName, res) {
    var options = {
        root: DIST_DIR,
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

        fs.readFile(path.join(DIST_DIR, 'index.html'), 'utf8', function(err, indexTemplate) {
            if (err) {
                logger.error(err);
                res.send(404);
            } else {
                res.contentType('text/html');
                res.send(ejs.render(indexTemplate, {
                    baseUrl: req.baseUrl
                }));
            }
        });
    });

    logger.debug('ready');
}

module.exports = {
    initialize: initialize,
    router: router
};
