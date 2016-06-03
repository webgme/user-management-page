import UserClient from './userClient';
import UsersClient from './usersClient';
import ProjectsClient from './projectsClient';
import OrganizationsClient from './organizationsClient';

/**
 * Single rest clients that contains user, users, projects, and orgs clients
 * @param {string} baseUrl - the base url
 * @param {boolean} debugMode - whether or not in debugMode(mocking data)
 */
export default function RestClient(baseUrl, debugMode) {
    baseUrl = baseUrl || '/api/';

    this.user = new UserClient(baseUrl, debugMode);
    this.users = new UsersClient(baseUrl);
    this.projects = new ProjectsClient(baseUrl);
    this.organizations = new OrganizationsClient(baseUrl);

}
