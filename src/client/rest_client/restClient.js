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
function RestClient(baseUrl, debugMode) {
    baseUrl = baseUrl || '/api/';

    this.user = new UserClient(baseUrl, debugMode);
    this.users = new UsersClient(baseUrl);
    this.projects = new ProjectsClient(baseUrl);
    this.organizations = new OrganizationsClient(baseUrl);

    /**
     * Returns a boolean for if the current user can authorize others to the project
     * @param {string} ownerId - id of owner
     * @return {Promise.<boolean>} - Boolean on if authorized!
     */
    this.canUserAuthorize = ownerId => {
        let authorization = false;

        return this.user.getCurrentUser()
            .then(currentUser => {
                if (currentUser._id === ownerId) {
                    authorization = true;
                } else { // Check if owner is an organization and current user is an admin
                    let findAdminPromiseArray = [];
                    currentUser.orgs.forEach(orgName =>
                        findAdminPromiseArray.push(this.organizations.getOrganization(orgName))
                    );
                    return Promise.all(findAdminPromiseArray)
                        .then(adminsOfOrganizationsUserIsIn => {
                            adminsOfOrganizationsUserIsIn.forEach(organizationData => {
                                if (ownerId === organizationData._id &&
                                    organizationData.admins.indexOf(currentUser._id) !== -1) {
                                    authorization = true;
                                }
                            });
                            // Done checking all organizations in and if owner is self
                            return authorization;
                        });
                }
                return authorization;
            });
    };
}

module.exports = RestClient;
