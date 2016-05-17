import BaseClient from './baseClient'

class OrgsClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getAllOrgs () {
        super.get('orgs');
    }

}

module.exports = OrgsClient;