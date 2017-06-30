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
     * @param {boolean} [includeDisabled=false] - include the disabled users.
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getAllUsers(includeDisabled) {
        let query = includeDisabled ? {includeDisabled: true} : null;
        return super.get(['users'], query);
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
     * @param {boolean} [force] - if true will remove the user from the database.
     * @return {Promise} //TODO: How to document the resolved value.
     */
    deleteUser(username, force) {
        let query = force ? {force: true} : null;

        return super.delete(['users', username], query);
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

    getUserSettings(username, componentId) {
        var path = componentId ? ['users', username, 'settings', componentId] : ['users', username, 'settings'];

        return super.get(path);
    }

    setUserSettings(username, value, componentId) {
        var path = componentId ? ['users', username, 'settings', componentId] : ['users', username, 'settings'];

        return super.put(path, value);
    }

    updateUserSettings(value, componentId) {
        var path = componentId ? ['users', username, 'settings', componentId] : ['users', username, 'settings'];

        return super.patch(path, value);
    }

    deleteUserSettings(componentId) {
        var path = componentId ? ['users', username, 'settings', componentId] : ['users', username, 'settings'];

        return super.delete(path);
    }
}
