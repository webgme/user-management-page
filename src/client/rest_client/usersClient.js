var BaseClient = require('./baseClient');

class UsersClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getAllUsers (callback) {
        super.get('users', null, function (err, result) {
            if (err) {
                callback(err);
            } else {
                // The body of the result contains a parsed JSON object with the result-data.
                callback(null, result.body);
            }
        });
    };

}

module.exports = UsersClient;