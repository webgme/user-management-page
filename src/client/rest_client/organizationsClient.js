/**
 * Organizations client - all rest calls for api/orgs
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

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

    // Non REST native Helper methods:
    /**
     * Hashes the names of all organizations with access to their respective rights
     * @param {string} projectId - id of project
     * @return {Promise.<{map}>} (Had to resolve the map to use it in parallel with another async function)
     */
    getOrganizationsWithAccessToProject(projectId) {
        let orgToRights = {};

        return this.getAllOrganizations()
            .then(orgs => {
                orgs.forEach(org => {
                    if (org.projects.hasOwnProperty(projectId)) {

                        let rightsOrigin = '';
                        if (org.projects[projectId].read) {
                            rightsOrigin += 'Read ';
                        }
                        if (org.projects[projectId].write) {
                            rightsOrigin += 'Write ';
                        }
                        if (org.projects[projectId].delete) {
                            rightsOrigin += 'Delete ';
                        }

                        orgToRights[org._id] = org.projects[projectId];
                        orgToRights[org._id].rightsOrigin = org._id + ': ' + rightsOrigin;
                    }
                });
                return Promise.resolve(orgToRights);
            });
    }

    /**
     * Hashes the names of users in specified list of organizations to their respective rights
     * @param {string} projectId - id of project
     * @return {Promise.<map>} returns map of the users in the specified list of organizations (names to rights)
     */
    getUsersInOrganizationsWithAccessToProject(projectId) {
        let userToOrgsRights = {};

        return this.getAllOrganizations()
            .then(orgs => {
                orgs.forEach(org => {
                    if (org.projects.hasOwnProperty(projectId)) {
                        org.users.forEach(user => {
                            if (userToOrgsRights[user]) { // If in multiple organizations
                                userToOrgsRights[user] = {
                                    read: userToOrgsRights[user].read || org.projects[projectId].read,
                                    write: userToOrgsRights[user].write || org.projects[projectId].write,
                                    delete: userToOrgsRights[user].delete || org.projects[projectId].delete,
                                    inOrg: true,
                                    rightsOrigin: userToOrgsRights[user].rightsOrigin ? userToOrgsRights[user].rightsOrigin + '\n' + org._id + JSON.stringify(orgs.projects[projectId]) : JSON.stringify(orgs.projects[projectId])
                                };
                            } else {
                                let rightsOrigin = '';
                                if (org.projects[projectId].read) {
                                    rightsOrigin += 'Read ';
                                }
                                if (org.projects[projectId].write) {
                                    rightsOrigin += 'Write ';
                                }
                                if (org.projects[projectId].delete) {
                                    rightsOrigin += 'Delete ';
                                }

                                userToOrgsRights[user] = JSON.parse(JSON.stringify(org.projects[projectId]));
                                userToOrgsRights[user].inOrg = true;
                                userToOrgsRights[user].rightsOrigin = userToOrgsRights[user].rightsOrigin ? userToOrgsRights[user].rightsOrigin + '\n' + org._id + ': ' + rightsOrigin : org._id + ': ' + rightsOrigin;
                            }
                        });
                    }
                });
                return userToOrgsRights;
            });
    }

}
