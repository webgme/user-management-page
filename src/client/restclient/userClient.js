var BaseClient = require('./baseClient');

class UserClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getCurrentUser (callback) {
        super.get('user', null, function (err, result) {
            if (err) {
                callback(err);
            } else {
                // The body of the result contains a parsed JSON object with the result-data.
                callback(null, result.body);
            }
        });
    };

}

module.exports = UserClient;