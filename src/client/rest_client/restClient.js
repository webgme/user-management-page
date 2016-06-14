/**
 * Single client - holds all clients & other methods
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import UserClient from './userClient';
import UsersClient from './usersClient';
import ProjectsClient from './projectsClient';
import OrganizationsClient from './organizationsClient';

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
    this.getAuthorizationToAdd = function(ownerId) {
        let self = this;
        let amIAuthorized = false;

        return self.user.getCurrentUser()
            .then(currentUser => {
                if (currentUser._id === ownerId) {
                    amIAuthorized = true;
                } else { // Check if owner is an organization and current user is an admin
                    let findAdminPromiseArray = [];
                    currentUser.orgs.forEach(orgName =>
                        findAdminPromiseArray.push(self.organizations.getOrganization(orgName))
                    );
                    return Promise.all(findAdminPromiseArray)
                        .then(adminsOfOrganizationsUserIsIn => {
                            adminsOfOrganizationsUserIsIn.forEach(organizationData => {
                                if (ownerId === organizationData._id &&
                                    organizationData.admins.indexOf(currentUser._id) !== -1) {
                                    amIAuthorized = true;
                                }
                            });
                            // Done checking all organizations in and if owner is self
                            return amIAuthorized;
                        });
                }
                return amIAuthorized;
            });
    };
}

module.exports = RestClient;
