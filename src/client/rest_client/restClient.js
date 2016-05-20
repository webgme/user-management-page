import UserClient from './userClient';
import UsersClient from './usersClient';
import ProjectsClient from './projectsClient';
import OrganizationsClient from './organizationsClient';

function RestClient(baseUrl) {
    baseUrl = baseUrl || '/api/';

    this.user = new UserClient(baseUrl);
    this.users = new UsersClient(baseUrl);
    this.projects = new ProjectsClient(baseUrl);
    this.organizations = new OrganizationsClient(baseUrl);
}

module.exports = RestClient;