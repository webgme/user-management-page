var BaseClient = require('./baseclient');

function UserClient(baseUrl) {
    BaseClient.call(this, baseUrl);
}

UserClient.prototype = Object.create(BaseClient.prototype);
UserClient.prototype.constructor = UserClient;

UserClient.prototype.getUser = function (callback) {
    this.get('user', null, function (err, result) {
        if (err) {
            callback(err);
        } else {
            // The body of the result contains a parsed JSON object with the result-data.
            callback(null, result.body);
        }
    });
};

module.exports = UserClient;