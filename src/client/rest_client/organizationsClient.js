import BaseClient from './baseClient'

class OrganizationsClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getAllOrganizations () {
        return super.get('orgs');
    }

}

module.exports = OrganizationsClient;