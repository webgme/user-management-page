import BaseClient from "./baseclient";

function UserClient(baseUrl) {

}

UserClient.prototype = Object.create(BaseClient);
UserClient.constructor = UserClient;

module.exports = UserClient;