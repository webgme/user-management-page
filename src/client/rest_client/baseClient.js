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
        let url = this.baseUrl + path + '/' + query;

        return new Promise((resolve, reject) => {
            superagent
                .get(url)
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
     * General PUT request
     * @param {string} path - path
     * @param {object} value - value to be set
     * @return {Promise} //TODO: How to document the resolved value.
     */
    put(path, value) {
        let url = this.baseUrl + path;

        return new Promise((resolve, reject) => {
            superagent
                .put(url)
                .send(value)
                .end((err, res) => {
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
        let url = this.baseUrl + path;

        return new Promise((resolve, reject) => {
            superagent
                .patch(url)
                .send(value)
                .end((err, res) => {
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
        let url = this.baseUrl + path;

        return new Promise((resolve, reject) => {
            superagent
                .delete(url)
                .end((err, res) => {
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
