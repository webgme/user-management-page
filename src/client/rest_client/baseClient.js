import superagent from 'superagent'

class BaseClient {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get (path, query) {
        query = query || '';
        var url = this.baseUrl + path + '/' + query;

        return new Promise ( function (resolve, reject) {
            superagent
                .get(url)
                .end( function(err, res) {
                    if (err || !res.ok) {
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                })
        });
    }

    //TO-DO: put the base methods in for put, patch, and delete

}

module.exports = BaseClient;