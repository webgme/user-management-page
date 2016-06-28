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

    constructor(baseUrl = '') {
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
        let data = {
            userId: userId,
            password: password
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
        let data = {
            userId: userId,
            password: password,
            email: email || ''
        };

        return super.post(['/api', 'register'], data);
    }

    getGmeConfig() {
        return super.get(['/gmeConfig.json']);
    }
}
