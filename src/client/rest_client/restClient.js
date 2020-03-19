/**
 * Single client - holds all clients & other methods
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

/* eslint-env node, browser */
import OrganizationsClient from './organizationsClient';
import ProjectsClient from './projectsClient';
import UserClient from './userClient';
import UsersClient from './usersClient';
import TokensClient from './tokensClient';

/**
 * Single rest clients that contains user, users, projects, and orgs clients
 * @param {string} baseUrl - the base url
 */
function RestClient(baseUrl) {

    if (typeof baseUrl !== 'string') {
        if (typeof document !== 'undefined') {
            baseUrl = document.getElementById('baseUrlHolder').getAttribute('data') + '/api/';
        } else {
            baseUrl = '/api/';
        }
    }
    this.organizations = new OrganizationsClient(baseUrl);
    this.projects = new ProjectsClient(baseUrl);
    this.user = new UserClient(baseUrl);
    this.users = new UsersClient(baseUrl);
    this.tokens = new TokensClient();

    /**
     * Gets the current user
     * @return {Promise} //TODO: How to document the resolved value.
     */
    this.getStatus = () => {
        return this.user.get(['status']);
    };
}

module.exports = RestClient;
