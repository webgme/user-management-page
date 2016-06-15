/**
 * Base client with core requests
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

/* eslint-env node, browser */
import superagent from 'superagent';

export default class BaseClient {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    /**
     * General GET request
     * @param {string} path - path
     * @param {string} query - query if any
     * @return {Promise} //TODO: How to document the resolved value.
     */
    get(path, query) {
        query = query || '';
        var url = this.baseUrl + path + '/' + query;

        return new Promise(function(resolve, reject) {
            superagent
                .get(url)
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
     * General PUT request
     * @param {string} path - path
     * @param {object} value - value to be set
     * @return {Promise} //TODO: How to document the resolved value.
     */
    put(path, value) {
        var url = this.baseUrl + path;

        return new Promise(function(resolve, reject) {
            superagent
                .put(url)
                .send(value)
                .end(function(err, res) {
                    if (err) {
                        console.log(err); // eslint-disable-line no-console
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });

    }

    /**
     * General PATCH request
     * @param {string} path - path
     * @param {object} value - value to be updated
     * @return {Promise} //TODO: How to document the resolved value.
     */
    patch(path, value) {
        var url = this.baseUrl + path;

        return new Promise(function(resolve, reject) {
            superagent
                .patch(url)
                .send(value)
                .end(function(err, res) {
                    if (err) {
                        console.log(err); // eslint-disable-line no-console
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });
    }

    /**
     * General DELETE request
     * @param {string} path - path
     * @return {Promise} //TODO: How to document the resolved value.
     */
    delete(path) {
        var url = this.baseUrl + path;

        return new Promise(function(resolve, reject) {
            superagent
                .delete(url)
                .end(function(err, res) {
                    if (err || !res.ok) {
                        console.log(err); // eslint-disable-line no-console
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });
    }

}
