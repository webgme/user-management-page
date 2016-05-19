import BaseClient from './baseClient';

class UserClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    /**
     * Gets the current user
     * @returns {Promise} //TODO: How to document the resolved value.
     */
    getCurrentUser() {
        return super.get('user');
    }

    /**
     * TODO: WebGme needs to update API documentation on patch requests for user (currently exists in the implementation)
     * @param {object} parameters - Specifies the user info to be updated
     * @param {string} parameters._id - New user ID
     * @param {boolean} parameters.canCreate - Boolean to indicate whether or not a user can create
     * @param {string} parameters.email - New user email
     * @param {array} parameters.orgs - Array of strings of organization names that user is a part of
     * @param {object} parameters.projects - List of objects(individual projects}
     * @param {string} parameters.projects.name - Name of each project
     * @param {object} parameters.projects.permissions - Object with booleans for read, write, and delete
     * @param {object} parameters.data - New user data
     * @param {object} parameters.settings - New user settings
     * @returns {Promise} //TODO: How to document the resolved value.
     */
    updateCurrentUser(parameters) {
        return super.patch('user', parameters);
    }

    /**
     * Deletes the current user
     * @returns {Promise} //TODO: How to document the resolved value.
     */
    deleteCurrentUser() {
        return super.delete('user');
    }

    /**
     * Gets the current user's data
     * @returns {Promise} //TODO: How to document the resolved value.
     */
    getCurrentUserData() {
        return super.get('user/data');
    }

    /**
     * Sets the current user's data
     * @param {object} value - The new user data
     * @returns {Promise} //TODO: How to document the resolved value.
     */
    setCurrentUserData(value) {
        return super.put('user/data', value);
    }

    /**
     * Updates the current user's data
     * @param {object} value - The updated user data
     * @returns {Promise} //TODO: How to document the resolved value.
     */
    updateCurrentUserData(value) {
        return super.put('user/data', value);
    }

    /**
     * Deletes the current user's data
     * @returns {Promise} //TODO: How to document the resolved value.
     */
    deleteCurrentUserData() {
        return super.delete('user/data');
    }
    
}

module.exports = UserClient;