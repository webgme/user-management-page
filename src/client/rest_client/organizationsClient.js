import BaseClient from './baseClient';

export default class OrganizationsClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    /**
     * Gets a list of all organizations
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getAllOrganizations() {
        return super.get('orgs');
    }

    /**
     * Gets a data of specified organization
     * @param {string} organizationName - name of organization
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getOrganization(organizationName) {
        return super.get('orgs', organizationName);
    }

    /**
     * Creates an organization
     * @param {string} organizationName - name of organization
     * @param {object} organizationObj - object containing org data
     * @return {Promise} //TODO: How to document the resolved value.
     */
    createOrganization(organizationName, organizationObj) {
        return super.put('orgs/' + organizationName, organizationObj);
    }

    /**
     * Deletes specified organization
     * @param {string} organizationName - name of organization
     * @return {Promise} //TODO: How to document the resolved value.
     */
    deleteOrganization(organizationName) {
        return super.delete('orgs/' + organizationName);
    }

    /**
     * Adds user to specified organization
     * @param {string} organizationName - name of organization
     * @param {string} username - username of user to be added to the org
     * @return {Promise} //TODO: How to document the resolved value.
     */
    addUserToOrganization(organizationName, username) {
        return super.put('orgs/' + organizationName + '/users/' + username);
    }

    /**
     * Deletes user from specified organization
     * @param {string} organizationName - name of organization
     * @param {string} username - username of user to be deleted from the org
     * @return {Promise} //TODO: How to document the resolved value.
     */
    deleteUserFromOrganization(organizationName, username) {
        return super.delete('orgs/' + organizationName + '/users/' + username);
    }

    /**
     * Makes user as admin of specified organization
     * @param {string} organizationName - name of organization
     * @param {string} username - username of user to be made admin of org
     * @return {Promise} //TODO: How to document the resolved value.
     */
    makeAdminOfOrganization(organizationName, username) {
        return super.put('orgs/' + organizationName + '/admins/' + username);
    }

    /**
     * Removes user as admin of specified organization
     * @param {string} organizationName - name of organization
     * @param {string} username - username of user to be removed as admin of org
     * @return {Promise} //TODO: How to document the resolved value.
     */
    removeAdminOfOrganization(organizationName, username) {
        return super.delete('orgs/' + organizationName + '/admins/' + username);
    }

    // Non REST native Helper methods:
    /**
     * Hashes the names of all organizations with access to their respective rights
     * @param {string} projectId - id of project
     * @return {Promise.<{map}>} (Had to resolve the map to use it in parallel with another async function)
     */
    getOrganizationsWithAccessToProject(projectId) {
        let organizationMap = {};

        return this.getAllOrganizations()
            .then(allOrganizations => {
                allOrganizations.forEach(oneOrganization => {
                    if (oneOrganization.projects.hasOwnProperty(projectId)) {
                        organizationMap[oneOrganization._id] = oneOrganization.projects[projectId];
                    }
                });
                return Promise.resolve(organizationMap);
            });
    }

    /**
     * Hashes the names of users in specified list of organizations to their respective rights
     * @param {string} projectId - id of project
     * @return {Promise.<map>} returns map of the users in the specified list of organizations (names to rights)
     */
    getUsersInOrganizationsWithAccessToProject(projectId) {
        let userInOrganizationMap = {};

        return this.getAllOrganizations()
            .then(allOrganizations => {
                allOrganizations.forEach(oneOrganization => {
                    if (oneOrganization.projects.hasOwnProperty(projectId)) {
                        oneOrganization.users.forEach(oneUser => {
                            if (userInOrganizationMap[oneUser]) { // If in multiple organizations
                                userInOrganizationMap[oneUser] = {
                                    read: userInOrganizationMap[oneUser].read || oneOrganization[projectId].read,
                                    write: userInOrganizationMap[oneUser].write || oneOrganization[projectId].write,
                                    delete: userInOrganizationMap[oneUser].delete || oneOrganization[projectId].delete,
                                    inOrg: true
                                };
                            } else {
                                userInOrganizationMap[oneUser] = oneOrganization.projects[projectId];
                                userInOrganizationMap[oneUser].inOrg = true;
                            }
                        });
                    }
                });
                return userInOrganizationMap;
            });
    }

}
