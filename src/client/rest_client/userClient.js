var BaseClient = require('./baseClient');

class UserClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getCurrentUser () {
        super.get('users', '');
    };

}

module.exports = UserClient;