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
     * @param {Array} path - path (ex. ['projects', 'ownerId', 'projectName'])
     * @param {Object} query - query if any (ex. {n: 100})
     * @return {Promise} //TODO: How to document the resolved value.
     */
    get(path, query = {}) {
        let url = this.baseUrl + path.join('/') + '/';

        return new Promise((resolve, reject) => {
            superagent
                .get(url)
                .query(query)
                .end((err, res) => {
                    if (err || !res.ok) {
                        console.error(err); // eslint-disable-line no-console
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });
    }

    /**
     * General PATCH request
     * @param {Array} path - path (ex. ['projects', 'ownerId', 'projectName'])
     * @param {object} value - value to be updated
     * @return {Promise} //TODO: How to document the resolved value.
     */
    patch(path, value) {
        let url = this.baseUrl + path.join('/') + '/';

        return new Promise((resolve, reject) => {
            superagent
                .patch(url)
                .send(value)
                .end((err, res) => {
                    if (err) {
                        console.error(err); // eslint-disable-line no-console
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });
    }

    /**
     * General POST request
     * @param {Array} path - path (ex. ['projects', 'ownerId', 'projectName'])
     * @param {object} data - data to be sent (ex. {userId: 'exampleId', password: 'examplePassword'})
     * @return {Promise} //TODO: How to document the resolved value.
     */
    post(path, data = {}) {
        let url = this.baseUrl + path.join('/') + '/';

        return new Promise((resolve, reject) => {
            superagent
                .post(url)
                .send(data)
                .end((err, res) => {
                    if (err) {
                        console.error(err); // eslint-disable-line no-console
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    }

    /**
     * General PUT request
     * @param {Array} path - path (ex. ['projects', 'ownerId', 'projectName'])
     * @param {object} value - value to be set
     * @return {Promise} //TODO: How to document the resolved value.
     */
    put(path, value = {}) {
        let url = this.baseUrl + path.join('/') + '/';

        return new Promise((resolve, reject) => {
            superagent
                .put(url)
                .send(value)
                .end((err, res) => {
                    if (err) {
                        console.error(err); // eslint-disable-line no-console
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });
    }

    /**
     * General DELETE request
     * @param {Array} path - path (ex. ['projects', 'ownerId', 'projectName'])
     * @return {Promise} //TODO: How to document the resolved value.
     */
    delete(path) {
        let url = this.baseUrl + path.join('/') + '/';

        return new Promise((resolve, reject) => {
            superagent
                .delete(url)
                .end((err, res) => {
                    if (err || !res.ok) {
                        console.error(err); // eslint-disable-line no-console
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });
    }

}
