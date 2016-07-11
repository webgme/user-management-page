/**
 * Organizations client - all rest calls for api/orgs
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import BaseClient from './baseClient';

export default class OrganizationsClient extends BaseClient {

    constructor(baseUrl = '/api/') {
        super(baseUrl);
    }

    /**
     * Gets a list of all organizations
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getAllOrganizations() {
        return super.get(['orgs']);
    }

    /**
     * Gets a data of specified organization
     * @param {string} organizationName - name of organization
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getOrganization(organizationName) {
        return super.get(['orgs', organizationName]);
    }

    /**
     * Creates an organization
     * @param {string} organizationName - name of organization
     * @param {object} organizationObj - object containing org data
     * @return {Promise} //TODO: How to document the resolved value.
     */
    createOrganization(organizationName, organizationObj = {}) {
        return super.put(['orgs', organizationName], organizationObj);
    }

    /**
     * Deletes specified organization
     * @param {string} organizationName - name of organization
     * @return {Promise} //TODO: How to document the resolved value.
     */
    deleteOrganization(organizationName) {
        return super.delete(['orgs', organizationName]);
    }

    /**
     * Adds user to specified organization
     * @param {string} organizationName - name of organization
     * @param {string} username - username of user to be added to the org
     * @return {Promise} //TODO: How to document the resolved value.
     */
    addUserToOrganization(organizationName, username) {
        return super.put(['orgs', organizationName, 'users', username]);
    }

    /**
     * Deletes user from specified organization
     * @param {string} organizationName - name of organization
     * @param {string} username - username of user to be deleted from the org
     * @return {Promise} //TODO: How to document the resolved value.
     */
    deleteUserFromOrganization(organizationName, username) {
        return super.delete(['orgs', organizationName, 'users', username]);
    }

    /**
     * Makes user as admin of specified organization
     * @param {string} organizationName - name of organization
     * @param {string} username - username of user to be made admin of org
     * @return {Promise} //TODO: How to document the resolved value.
     */
    makeAdminOfOrganization(organizationName, username) {
        return super.put(['orgs', organizationName, 'admins', username]);
    }

    /**
     * Removes user as admin of specified organization
     * @param {string} organizationName - name of organization
     * @param {string} username - username of user to be removed as admin of org
     * @return {Promise} //TODO: How to document the resolved value.
     */
    removeAdminOfOrganization(organizationName, username) {
        return super.delete(['orgs', organizationName, 'admins', username]);
    }

}
