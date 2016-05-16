var UserClient = require('./userClient');

function RestClient(baseUrl) {
    baseUrl = baseUrl || '/api/';
    this.user = new UserClient(baseUrl);
    //TO-DO: other clients
}

module.exports = RestClient;