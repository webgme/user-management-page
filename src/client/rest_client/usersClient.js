/**
 * Users client - all rest calls for api/users
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import BaseClient from './baseClient';

export default class UsersClient extends BaseClient {

    constructor(baseUrl = '/api/') {
        super(baseUrl);
    }

    /**
     * Gets all the users on the server
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getAllUsers() {
        return super.get(['users']);
    }

    /**
     * Gets specific user by username
     * @param {string} username - username of user requested
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getUser(username) {
        return super.get(['users', username]);
    }

    /**
     * Adds a user (Requires user.siteAdmin)
     * @param {string} username - username of user to be created
     * @param {object} userObj - contains info of the new user
     * @return {Promise} //TODO: How to document the resolved value.
     */
    addUser(username, userObj) {
        return super.put(['users', username], userObj);
    }

    /**
     * @param {string} username - username of user to be updated
     * @param {object} userObj - info of user that needs updating
     * @return {Promise} //TODO: How to document the resolved value.
     */
    updateUser(username, userObj) {
        return super.patch(['users', username], userObj);
    }

    /**
     * Deletes the user specified (requires is current user or user.siteAdmin)
     * @param {string} username - username of user to be deleted
     * @return {Promise} //TODO: How to document the resolved value.
     */
    deleteUser(username) {
        return super.delete(['users', username]);
    }

    /**
     * Gets the data of specified user
     * @param {string} username - username of user whose data is being requested
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getUserData(username) {
        return super.get(['users', username, 'data']);
    }

    /**
     * Sets the specified user's data
     * @param {string} username - name of user whose data is being set
     * @param {object} userData - the created data
     * @return {Promise} //TODO: How to document the resolved value.
     */
    setUserData(username, userData) {
        return super.put(['users', username, 'data'], userData);
    }

    /**
     * Updates the specified user's data
     * @param {string} username - name of user whose data is being updated
     * @param {object} userData - the new data
     * @return {Promise} //TODO: How to document the resolved value.
     */
    updateUserData(username, userData) {
        return super.patch(['users', username, 'data'], userData);
    }

    /**
     * Deletes the specified user's data
     * @param {string} username - username of user whose data is being deleted
     * @return {Promise} //TODO: How to document the resolved value.
     */
    deleteUserData(username) {
        return super.delete(['users', username, 'data']);
    }

    // Non REST native Helper methods:
    /**
     * Maps usernames of users with access to a specified project to their respective rights
     * @param {string} projectId - Id of project
     * @return {Promise<{map}>} map of users to their rights to a specified projects
     */
    getUsersWithAccessToProject(projectId) {
        let userMap = {};
        return this.getAllUsers()
            .then(users => {
                users.forEach(user => {
                    if (user.projects.hasOwnProperty(projectId)) {

                        // Building rights string
                        let userRightsOrigin = '';
                        if (user.projects[projectId].read) {
                            userRightsOrigin += 'Read ';
                        }
                        if (user.projects[projectId].write) {
                            userRightsOrigin += 'Write ';
                        }
                        if (user.projects[projectId].delete) {
                            userRightsOrigin += 'Delete ';
                        }

                        userMap[user._id] = {
                            read: user.projects[projectId].read,
                            write: user.projects[projectId].write,
                            delete: user.projects[projectId].delete,
                            inOrg: false,
                            userRightsOrigin: [userRightsOrigin],
                            orgsRightsOrigin: []
                        };
                    }
                });
                return userMap;
            });
    }

}
