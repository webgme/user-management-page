import BaseClient from './baseClient'

class UsersClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getAllUsers () {
        return super.get('users');
    };

}

module.exports = UsersClient;