import BaseClient from './baseClient';

class ProjectsClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    /**
     * Gets a list of all the projects (only lists the projects where the user has at least read access)
     * @returns {Promise} //TODO: How to document the resolved value.
     */
    getAllProjects () {
        return super.get('projects');
    }

    getProject(ownerId, projectName) {
        return super.get('projects', ownerId + '/' + projectName);
    }

    /**
     * Creates a new project.
     * @param {string} ownerId
     * @param {string} projectName
     * @param {object} parameters - Specifies where the seed is coming from. //TODO: WebGME needs to update these!
     * @param {string} parameters.type - Which type of seeding should be used.
     * @param {string} parameters.seedName - Name of the seed.
     * @param {string} parameters.seedBranch - Name of branch if seeding from existing project.
     * @param {string} parameters.ownerId - ID of owner
     * @returns {Promise} //TODO: How to document the resolved value.
     */
    addProject(ownerId, projectName, parameters) {
        return super.put('projects/' + ownerId + '/' + projectName, parameters);
    }

    updateProject(ownerId, projectName, projectObj) {
        return super.patch('projects/' + ownerId + '/' + projectName, projectObj);
    }

    deleteProject(ownerId, projectName) {
        return super.delete('projects/' + ownerId + '/' + projectName);
    }

    removeRightsToProject(ownerId, projectName, userOrOrgId) {
        return super.delete('projects/' + ownerId + '/' + projectName + '/' + userOrOrgId);
    }

    grantRightsToProject(ownerId, projectName, userOrOrgId, rights) {
        return super.put('projects/' + ownerId + '/' + projectName + '/' + userOrOrgId, rights);
    }

    /**
     * Gets the latest commits for the project.
     * @param {string} ownerId
     * @param {string} projectName
     * @param {number} [numCommits=100] - Maximum number of commits to retrieve.
     * @returns {Promise} //TODO: How to document the resolved value.
     */
    getLatestCommits(ownerId, projectName, numCommits) {
        var query;
        numCommits = numCommits || 100;
        query = '?n=' + numCommits;
        return super.get('projects/' + ownerId + '/' + projectName, query);
    }

    getCommitById(ownerId, projectName, commitId) {
        return super.get('projects/' + ownerId + '/' + projectName + '/commits', commitId);
    }

    getRawDataAtPath(ownerId, projectName, commitId, nodePath) {
        return super.get('projects/' + ownerId + '/' + projectName + '/commits/' + commitId + '/tree', nodePath);
    }

    getBranchOrCommitComparison(ownerId, projectName, branchOrCommitA, branchOrCommitB) {
        return super.get('projects/' + ownerId + '/' + projectName + '/compare',
            branchOrCommitA + '...' + branchOrCommitB);
    }

    getBranches(ownerId, projectName) {
        return super.get('projects/' + ownerId + '/' + projectName, 'branches');
    }

    getBranch(ownerId, projectName, branchId) {
        return super.get('projects/' + ownerId + '/' + projectName + '/branches', branchId);
    }

    addBranch(ownerId, projectName, branchId, branchObj) {
        return super.put('projects/' + ownerId + '/' + projectName + '/branches/' + branchId, branchObj);
    }

    updateBranch(ownerId, projectName, branchId, branchObj) {
        return super.patch('projects/' + ownerId + '/' + projectName + '/branches/' + branchId, branchObj);
    }

    deleteBranch(ownerId, projectName, branchId) {
        return super.delete('projects/' + ownerId + '/' + projectName + '/branches/' + branchId);
    }

    getLatestCommitsByBranch(ownerId, projectName, branchId, numCommits) {
        return super.get('projects/' + ownerId + '/' + projectName + '/branches/' + branchId, numCommits);
    }

    getRawDataAtPathAtBranch(ownerId, projectName, branchId, nodePath) {
        return super.get('projects/' + ownerId + '/' + projectName + '/branches/' + branchId + '/tree', nodePath);
    }

    getProjectTags(ownerId, projectName) {
        return super.get('projects/' + ownerId + '/' + projectName, 'tags');
    }

    getTag(ownerId, projectName, tagId) {
        return super.get('projects/' + ownerId + '/' + projectName + '/tags', tagId);
    }

    addTag(ownerId, projectName, tagId, tagObj) {
        return super.put('projects/' + ownerId + '/' + projectName + '/tags/' + tagId, tagObj);
    }

    updateTag(ownerId, projectName, tagId, tagObj) {
        return super.patch('projects/' + ownerId + '/' + projectName + '/tags/' + tagId, tagObj);
    }

    deleteTag(ownerId, projectName, tagId) {
        return super.delete('projects/' + ownerId + '/' + projectName + '/tags/' + tagId);
    }

}

module.exports = ProjectsClient;