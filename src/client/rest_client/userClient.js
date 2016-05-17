import BaseClient from './baseClient'

class UserClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getCurrentUser () {
        super.get('user');
    };

}

module.exports = UserClient;