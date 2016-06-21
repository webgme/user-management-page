/**
 * @author pmeijer / https://github.com/pmeijer
 */

/* eslint-env node, browser */
import superagent from 'superagent';

/**
 * Class for logging in and registering user. Note that these post requests do not require
 * the user to be authenticated.
 * @class
 */
export default class LoginClient {

    constructor(baseUrl) {
        this.baseUrl = baseUrl || '';
    }

    /**
     * Post request for logging in as userId.
     * If successful client will be redirected to the path given in query parameter
     * @param {string} userId - id of user
     * @param {string} password - password of user
     * @param {string} redirectUrl - where to redirect on success
     * @return {Promise} resolves if successfully logged in.
     */
    login(userId, password, redirectUrl) {
        let url = this.baseUrl + '/login',
            data = {
                userId: userId,
                password: password
            };

        return new Promise((resolve, reject) => {
            superagent
                .post(url)
                .send(data)
                .query({redirect: redirectUrl})
                .query({username: userId})
                .end((err, res) => {
                    if (err || !res.ok) {
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });
    }

    /**
     * Post request for logging out
     * Cookies will be cleared and user will be redirected to login page
     * @return {Promise} resolves if successfully logged in.
     */
    logout() {
        let url = this.baseUrl + '/login';

        return new Promise((resolve, reject) => {
            superagent
                .post(url)
                .end((err, res) => {
                    if (err || !res.ok) {
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });
    }

    /**
     * Post request for registering a new user.
     * @param {string} userId - Id of new user
     * @param {string} password - Password for user
     * @param {string} [email=''] - optional email address.
     * @return {Promise} - resolves if successfully added user, rejects otherwise.
     */
    register(userId, password, email) {
        let url = this.baseUrl + '/api/register',
            data = {
                userId: userId,
                password: password,
                email: email || ''
            };

        return new Promise((resolve, reject) => {
            superagent
                .post(url)
                .send(data)
                .end((err, res) => {
                    if (err || !res.ok) {
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });
    }
}
