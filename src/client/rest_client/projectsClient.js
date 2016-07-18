/**
 * Projects client - all rest calls for api/projects
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import BaseClient from './baseClient';

export default class ProjectsClient extends BaseClient {

    constructor(baseUrl = '/api/') {
        super(baseUrl);
    }

    /**
     * Gets a list of all the projects (only lists the projects where the user has at least read access)
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getAllProjects() {
        return super.get(['projects']);
    }

    /**
     * Gets specific project
     * @param {string} ownerId - id of owner
     * @param {string} projectName - name of project
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getProject(ownerId, projectName) {
        return super.get(['projects', ownerId, projectName]);
    }

    /**
     * Creates a new project.
     * @param {string} ownerId - owner's Id
     * @param {string} projectName - name of project
     * @param {object} parameters - Specifies where the seed is coming from. //TODO: WebGME needs to update these!
     * @param {string} parameters.type - Which type of seeding should be used.
     * @param {string} parameters.seedName - Name of the seed.
     * @param {string} parameters.seedBranch - Name of branch if seeding from existing project.
     * @param {string} parameters.ownerId - ID of owner
     * @return {Promise} //TODO: How to document the resolved value.
     */
    addProject(ownerId, projectName, parameters) {
        return super.put(['projects', ownerId, projectName], parameters);
    }

    /**
     * Updates the metadata info of a specific project.
     * Requires write access (FIXME: webgme should consider to only allow siteAdmins to do this).
     * TODO: webgme should consider adding a description field.
     * @param {string} ownerId - id of owner
     * @param {string} projectName - name of project
     * @param {object} info - object containing project info data to be updated.
     * @param {string} [info.viewedAt] - Sets the last viewed time.
     * @param {string} [info.viewer] - Sets the last user who viewed the project.
     * @param {string} [info.modifiedAt] - Sets the last modified time.
     * @param {string} [info.modifier] - Sets the last user who modified the project.
     * @param {string} [info.createdAt] - Sets the creator of the project.
     * @param {string} [info.creator] - Sets the user who created the project.
     * @return {Promise} //TODO: How to document the resolved value.
     */
    updateProject(ownerId, projectName, info) {
        return super.patch(['projects', ownerId, projectName], info);
    }

    /**
     * Deletes a specific project.
     * Requires delete access.
     * @param {string} ownerId - id of owner
     * @param {string} projectName - name of project
     * @return {Promise} //TODO: How to document the resolved value.
     */
    deleteProject(ownerId, projectName) {
        return super.delete(['projects', ownerId, projectName]);
    }

    /**
     * Removes a user or organization's right to a project.
     * Requires ownership, admin in org with ownership, or siteAdmin.
     * @param {string} ownerId - id of owner
     * @param {string} projectName - name of project
     * @param {string} userOrOrgId - id of user or org losing rights to project
     * @return {Promise} //TODO: How to document the resolved value.
     */
    removeRightsToProject(ownerId, projectName, userOrOrgId) {
        return super.delete(['projects', ownerId, projectName, 'authorize', userOrOrgId]);
    }

    /**
     * Grants a user or organization rights to a project.
     * Requires ownership, admin in org with ownership, or siteAdmin.
     * @param {string} ownerId - id of owner
     * @param {string} projectName - name of project
     * @param {string} userOrOrgId - id of user or org gaining rights to project
     * @param {string} rights - combination of r,w,d (read, write, delete)
     * @return {Promise} //TODO: How to document the resolved value.
     */
    grantRightsToProject(ownerId, projectName, userOrOrgId, rights) {
        return super.put(['projects', ownerId, projectName, 'authorize', userOrOrgId, rights]);
    }

    /**
     * Transfers a project to an organization
     * Requires delete access, admin in org other than owner, or siteAdmin.
     * @param {string} ownerId - id of owner
     * @param {string} projectName - name of project
     * @param {string} userOrOrgId - id of org gaining ownership of project
     * @return {Promise} //TODO: How to document the resolved value.
     */
    transferProject(ownerId, projectName, userOrOrgId) {
        return super.post(['projects', ownerId, projectName, 'transfer', userOrOrgId]);
    }

    /**
     * Gets the latest commits for the project.
     * Requires read access.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {number} [numCommits=100] - Maximum number of commits to retrieve.
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getLatestCommits(ownerId, projectName, numCommits = 100) {
        let query = {
            n: numCommits
        };

        return super.get(['projects', ownerId, projectName, 'commits'], query);
    }

    /**
     * Retrieves commit object associated with commitId.
     * Requires read access.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {string} commitId - commit hash, with or w/o URL-enconded '#'
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getCommitById(ownerId, projectName, commitId) {
        return super.get(['projects', ownerId, projectName, 'commits', commitId]);
    }

    /**
     * Retrieves the raw data object at given path within the project tree. Requires read access for project.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {string} commitId - commit hash, with or w/o URL-enconded '#'
     * @param {string} nodePath - path of node: ex. 1563412505/5585498754
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getRawDataAtPath(ownerId, projectName, commitId, nodePath) {
        return super.get(['projects', ownerId, projectName, 'commits', commitId, 'tree', nodePath]);
    }

    /**
     * Compares two branches or commits for a project
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {string} branchOrCommitA - branch/commit of one
     * @param {string} branchOrCommitB - other branch/commit
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getBranchOrCommitComparison(ownerId, projectName, branchOrCommitA, branchOrCommitB) {
        return super.get(['projects', ownerId, projectName, 'compare',
            branchOrCommitA, '...', branchOrCommitB]);
    }

    /**
     * Get a list of branches.
     * Requires read access.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getAllBranches(ownerId, projectName) {
        return super.get(['projects', ownerId, projectName, 'branches']);
    }

    /**
     * Get a specific branch. Requires read access for project.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {string} branchId - id of branch: ex. master
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getBranch(ownerId, projectName, branchId) {
        return super.get(['projects', ownerId, projectName, 'branches', branchId]);
    }

    /**
     * Adds a new branch to WebGME. Requires write access for project.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {string} branchId - id of branch: ex. master
     * @param {object} branchObj - ex: {"hash": "#f2a624d9cfbf883c927b04dd45800ba55537dff5"}
     * @return {Promise} //TODO: How to document the resolved value.
     */
    addBranch(ownerId, projectName, branchId, branchObj) {
        return super.put(['projects', ownerId, projectName, 'branches', branchId], branchObj);
    }

    /**
     * Updates a branch to WebGME. Requires write access for project.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {string} branchId - id of branch: ex. master
     * @param {object} branchObj - ex: {"oldHash": "#actualOldHash","newHash": "#actualNewHash"}
     * @return {Promise} //TODO: How to document the resolved value.
     */
    updateBranch(ownerId, projectName, branchId, branchObj) {
        return super.patch(['projects', ownerId, projectName, 'branches', branchId], branchObj);
    }

    /**
     * Delete branch from WebGME. Requires write access for project.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {string} branchId - id of branch: ex. master
     * @return {Promise} //TODO: How to document the resolved value.
     */
    deleteBranch(ownerId, projectName, branchId) {
        return super.delete(['projects', ownerId, projectName, 'branches', branchId]);
    }

    /**
     * Retrives an array of the commit history for the branch. Requires read access for project.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {string} branchId - id of branch: ex. master
     * @param {number} numCommits - maximum to retrieve (default 100)
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getLatestCommitsByBranch(ownerId, projectName, branchId, numCommits = 100) {
        let query = {
            n: numCommits
        };

        return super.get(['projects', ownerId, projectName, 'branches', branchId, 'commits'], query);
    }

    /**
     * Retrieves the raw data object at given path within the project tree. Requires read access for project.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {string} branchId - id of branch: ex. master
     * @param {string} nodePath - ex. 1563412505/5585498754
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getRawDataAtPathAtBranch(ownerId, projectName, branchId, nodePath) {
        return super.get(['projects', ownerId, projectName, 'branches', branchId, 'tree', nodePath]);
    }

    /**
     * Get a list of tags. Requires read access for project.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getProjectTags(ownerId, projectName) {
        return super.get(['projects', ownerId, projectName, 'tags']);
    }

    /**
     * Get the tag. Requires read access for project.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {string} tagId - ex. myTag
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getTag(ownerId, projectName, tagId) {
        return super.get(['projects', ownerId, projectName, 'tags', tagId]);
    }

    /**
     * Adds tag to project. Requires write access for project.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {string} tagId - ex. myTag
     * @param {object} tagObj - ex. {"hash": "#actualHash"}
     * @return {Promise} //TODO: How to document the resolved value.
     */
    addTag(ownerId, projectName, tagId, tagObj) {
        return super.put(['projects', ownerId, projectName, 'tags', tagId], tagObj);
    }

    /**
     * Updates tag. Requires delete access for project.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {string} tagId - ex. myTag
     * @param {object} tagObj - ex. {"hash": "#newHash"}
     * @return {Promise} //TODO: How to document the resolved value.
     */
    updateTag(ownerId, projectName, tagId, tagObj) {
        return super.patch(['projects', ownerId, projectName, 'tags', tagId], tagObj);
    }

    /**
     * Deletes tag. Requires delete access for project.
     * @param {string} ownerId - owner's id
     * @param {string} projectName = name of project
     * @param {string} tagId - ex. myTag
     * @return {Promise} //TODO: How to document the resolved value.
     */
    deleteTag(ownerId, projectName, tagId) {
        return super.delete(['projects', ownerId, projectName, 'tags', tagId]);
    }

}
