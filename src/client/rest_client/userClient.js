import BaseClient from './baseClient';

export default class UserClient extends BaseClient {

    constructor(baseUrl, debugMode) {
        super(baseUrl);
        this.debugMode = debugMode;
    }

    /**
     * Gets the current user
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getCurrentUser() {
        var promise;
        if (this.debugMode) {
            promise = new Promise(function(resolve, reject) {
                resolve({
                    _id: "johnDoe",
                    email: "john@Doe.com",
                    canCreate: true,
                    data: {},
                    settings: {},
                    projects: {
                        'johnDoe+Test_Project': {
                            read: true,
                            write: true,
                            delete: true
                        },
                        'johnDoe+Some_Project': {
                            read: true,
                            write: true,
                            delete: true
                        },
                        'johnDoe+Third_Project': {
                            read: true,
                            write: true,
                            delete: true
                        }
                    },
                    type: "User",
                    orgs: [],
                    siteAdmin: true
                });
            });
        } else {
            promise = super.get('user');
        }
        return promise;
    }

    /**
     * TODO: WebGme needs API doc update on patch requests for user (currently exists in the implementation)
     * @param {object} parameters - Specifies the user info to be updated
     * @param {string} parameters.email - New user email
     * @param {string} parameters.password - New user password
     * @param {boolean} parameters.canCreate - Boolean to indicate whether or not a user can create
     * @param {boolean} parameters.siteAdmin - Boolean to indicate whether or not a user is site admin
     * @param {object} parameters.data - New user data
     * @param {object} parameters.settings - New user settings
     * @return {Promise} //TODO: How to document the resolved value.
     */
    updateCurrentUser(parameters) {
        return super.patch('user', parameters);
    }

    /**
     * Deletes the current user
     * @return {Promise} //TODO: How to document the resolved value.
     */
    deleteCurrentUser() {
        return super.delete('user');
    }

    /**
     * Gets the current user's data
     * @return {Promise} //TODO: How to document the resolved value.
     */
    getCurrentUserData() {
        return super.get('user/data');
    }

    /**
     * Sets the current user's data
     * @param {object} value - The new user data
     * @return {Promise} //TODO: How to document the resolved value.
     */
    setCurrentUserData(value) {
        return super.put('user/data', value);
    }

    /**
     * Updates the current user's data
     * @param {object} value - The updated user data
     * @return {Promise} //TODO: How to document the resolved value.
     */
    updateCurrentUserData(value) {
        return super.put('user/data', value);
    }

    /**
     * Deletes the current user's data
     * @return {Promise} //TODO: How to document the resolved value.
     */
    deleteCurrentUserData() {
        return super.delete('user/data');
    }

}
