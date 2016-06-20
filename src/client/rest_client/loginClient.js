/**
 * @author pmeijer / https://github.com/pmeijer
 */

/* eslint-env node, browser */
import superagent from 'superagent';

/**
 * Class for logging in and register user. Note that these post requests do not require
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
        var url = this.baseUrl + '/login',
            data = {
                userId: userId,
                password: password
            };

        return new Promise(function(resolve, reject) {
            superagent
                .post(url)
                .send(data)
                .query({redirect: redirectUrl})
                .query({username: userId})
                .end(function(err, res) {
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
        var url = this.baseUrl + '/api/register';
        var data = {
            userId: userId,
            password: password,
            email: email || ''
        };

        return new Promise(function(resolve, reject) {
            superagent
                .post(url)
                .send(data)
                .end(function(err, res) {
                    if (err || !res.ok) {
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });
    }
}
