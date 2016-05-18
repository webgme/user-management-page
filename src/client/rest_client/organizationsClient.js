import BaseClient from './baseClient'

class OrganizationsClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getAllOrganizations () {
        return super.get('orgs');
    }

    getOrganizationData(organizationName) {
        return super.get('orgs', organizationName);
    }

    createOrganization(organizationName, organizationObj) {
        return super.put('orgs/' + organizationName , organizationObj);
    }

    deleteOrganization(organizationName) {
        return super.delete('orgs/' + organizationName);
    }

    addUserToOrganization(organizationName, username) {
        return super.put('orgs/' + organizationName + '/users/' + username);
    }

    deleteUserFromOrganization(organizationName, username) {
        return super.delete('orgs/' + organizationName + '/users/' + username);
    }

    makeAdminOfOrganization(organizationName, username) {
        return super.put('orgs/' + organization + '/admins/' + username)
    }

    removeAdminOfOrganization(organizationName, username) {
        return super.delete('orgs/' + organization + '/admins/' + username)
    }

}

module.exports = OrganizationsClient;