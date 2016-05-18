import BaseClient from './baseClient'

class ProjectsClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getAllProjects () {
        return super.get('projects');
    };

}

module.exports = ProjectsClient;