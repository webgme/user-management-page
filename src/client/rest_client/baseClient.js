import superagent from 'superagent'

class BaseClient {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get (path, query) {
        query = query || '';
        var url = this.baseUrl + path + '/' + query;

        var getPromise = new Promise ( function (resolve, reject) {
            superagent
                .get(url)
                .end( function(err, res) {
                    if (err || !res.ok) {
                        reject();
                    } else {
                        resolve(res.body);
                    }
                })
        }).then(function (response) {
            console.log('Data fetched!: ', response);
        }).catch(function (error) {
                console.error('Error fetching data. ', error);
        });

        return getPromise;
    }

    //TO-DO: do the same for put, patch, delete
    //       fix calls for put patch delete

}

module.exports = BaseClient;