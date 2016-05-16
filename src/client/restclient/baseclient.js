var superagent = require('superagent');

function BaseClient(baseUrl) {
    this.baseUrl = baseUrl;
}

BaseClient.prototype.get = function (path, query, callback) {
    var url = this.baseUrl + path;
    superagent.get(url)
        .end(function (err, res) {
            callback(err, res);
        });
};

//TO-DO: do the same for put, patch, delete

module.exports = BaseClient;