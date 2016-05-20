import superagent from 'superagent';

class BaseClient {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get(path, query) {
        query = query || '';
        var url = this.baseUrl + path + '/' + query;

        return new Promise( function (resolve, reject) {
            superagent
                .get(url)
                .end( function(err, res) {
                    if (err || !res.ok) {
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });
    }

    put(path, value) {
        var url = this.baseUrl + path;

        return new Promise( function(resolve, reject) {
            superagent
                .put(url)
                .send(value)
                .end( function(err, res) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });

    }

    patch(path, value) {
        var url = this.baseUrl + path;

        return new Promise( function(resolve, reject) {
            superagent
                .patch(url)
                .send(value)
                .end( function(err, res) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });

    }
    
    delete(path) {
        var url = this.baseUrl + path;

        return new Promise( function (resolve, reject) {
            superagent
                .delete(url)
                .end( function(err, res) {
                    if (err || !res.ok) {
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
        });
    }

}

module.exports = BaseClient;