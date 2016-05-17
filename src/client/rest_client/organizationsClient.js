import BaseClient from './baseClient'

class OrganizationsClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getAllOrganizations () {
        super.get('orgs');
    }

}

module.exports = OrganizationsClient;