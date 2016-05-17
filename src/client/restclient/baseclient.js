var superagent = require('superagent');

class BaseClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //later can just use super.(method) through ES6 subclasses
    get (path, query, callback) {
        var url = this.baseUrl + path;
        superagent.get(url)
            .end(function (err, res) {
                callback(err, res);
            });
    };

    //TO-DO: do the same for put, patch, delete
}

module.exports = BaseClient;