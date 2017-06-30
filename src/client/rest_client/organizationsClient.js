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
     * @param {boolean} [includeDisabled=false] - include the disabled orgs.
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getAllOrganizations(includeDisabled) {
        let query = includeDisabled ? {includeDisabled: includeDisabled} : null;
        return super.get(['orgs'], query);
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
     * @param {boolean} [force] - if true will remove the organization from the database.
     * @return {Promise} //TODO: How to document the resolved value.
     */
    deleteOrganization(organizationName, force) {
        let query = force ? {force: true} : null;

        return super.delete(['orgs', organizationName], query);
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

    updateOrganization(organizationName, data) {
        return super.patch(['orgs', organizationName], data);
    }
}
