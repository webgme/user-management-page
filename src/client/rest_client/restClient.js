/**
 * Single client - holds all clients & other methods
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import OrganizationsClient from './organizationsClient';
import ProjectsClient from './projectsClient';
import UserClient from './userClient';
import UsersClient from './usersClient';

/**
 * Single rest clients that contains user, users, projects, and orgs clients
 * @param {string} baseUrl - the base url
 * @param {boolean} debugMode - whether or not in debugMode(mocking data)
 */
function RestClient(baseUrl = '/api/', debugMode = false) {

    this.organizations = new OrganizationsClient(baseUrl);
    this.projects = new ProjectsClient(baseUrl);
    this.user = new UserClient(baseUrl);
    this.users = new UsersClient(baseUrl);

    /**
     * Returns a boolean for if the current user can authorize others to the project
     * @param {string} ownerId - id of owner
     * @return {Promise.<boolean>} - Boolean on if authorized!
     */
    this.canUserAuthorize = (ownerId) => {
        let authorization = false;

        return this.user.getCurrentUser()
            .then(user => {
                if (user._id === ownerId) {
                    authorization = true;
                } else { // Check if owner is an organization and current user is an admin
                    return this.organizations.getAllOrganizations()
                        .then((orgs) => {
                            authorization = orgs.some((org) => {
                                return org._id === ownerId && org.admins.indexOf(user._id) !== -1;
                            });
                        });
                }
                return authorization;
            });
    };
}

module.exports = RestClient;
