/* eslint-disable require-jsdoc */
/**
 * @author pmeijer / https://github.com/pmeijer
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

/* eslint-env node, browser */

import BaseClient from './baseClient';

/**
 * Class for logging in and registering user. Note that these post requests do not require
 * the user to be authenticated.
 * @class
 */
export default class LoginClient extends BaseClient {

    constructor(baseUrl) {
        if (typeof baseUrl !== 'string') {
            if (typeof document !== 'undefined') {
                baseUrl = document.getElementById('baseUrlHolder').getAttribute('data');
            } else {
                baseUrl = '';
            }
        }
        super(baseUrl);
    }

    /**
     * Post request for logging in as userId.
     * If successful client will be redirected to the path given in query parameter
     * @param {string} userId - id of user
     * @param {string} password - password of user
     * @return {Promise} resolves if successfully logged in.
     */
    login(userId, password) {
        const data = {
            userId: userId,
            password: password,
        };

        return super.post(['/login'], data);
    }

    /**
     * Post request for registering a new user.
     * @param {string} userId - Id of new user
     * @param {string} password - Password for user
     * @param {string} [email=''] - optional email address.
     * @return {Promise} - resolves if successfully added user, rejects otherwise.
     */
    register(userId, password, email) {
        const data = {
            userId: userId,
            password: password,
            email: email || '',
        };

        return super.post(['/api', 'register'], data);
    }

    /**
     * Get request to gather configuration information.
     * @return {Promise} - resolves if successfully get configuration data.
     */
    getGmeConfig() {
        return super.get(['/gmeConfig.json']);
    }

    /**
     * Post request for reset a userId.
     * If successful client will be redirected to the path given in query parameter
     * @param {string} userId - id of user
     * @return {Promise} resolves if successfully logged in.
     */
    reset(userId) {
        const data = {
            userId: userId,
        };

        return super.post(['/api', 'reset'], data);
    }

    /**
     * Get request for logging in as userId.
     * If successful client will be redirected to the path given in query parameter
     * @param {string} userId - id of user
     * @param {string} resetHash - the temporary id of the reset request
     * @return {Promise} resolves if successfully logged in.
     */
    verifyReset(userId, resetHash) {
        const query = {
            userId: userId,
            resetHash: resetHash,
        };

        return super.get(['/api', 'reset'], query);
    }

    /**
     * Post request for logging in as userId.
     * If successful client will be redirected to the path given in query parameter
     * @param {string} userId - id of user
     * @param {string} resetHash - the code of the reset
     * @param {string} newPassword - the new password
     * @return {Promise} resolves if successfully logged in.
     */
    updatePassword(userId, resetHash, newPassword) {
        const data = {
            userId: userId,
            resetHash: resetHash,
            newPassword: newPassword,
        };
        return super.patch(['/api', 'reset'], data);
    }

    /**
     * Get request for logging in using AzureActiveDirectory.
     * If successful client will be redirected to the path given in query parameter
     * @return {Promise} resolves if successfully logged in.
     */
    azureLogin() {
        return super.get(['/aad']);
    }
}
