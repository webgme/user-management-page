import BaseClient from './baseClient'

class UsersClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getAllUsers () {
        super.get('users');
    };

}

module.exports = UsersClient;