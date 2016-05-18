import BaseClient from './baseClient'

class UsersClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getAllUsers () {
        return super.get('users');
    }

    getUser(username) {
        return super.get('users', username);
    }

    addUser(username, userObj) {
        return super.put('users/' + username, userObj)
    }

    updateUser(username, userObj) {
        return super.patch('users/' + username, userObj)
    }

    deleteUser(username) {
        return super.delete('users/' + username);
    }

    getUserData(username) {
        return super.get('users', (username + '/data') );
    }

    addUserData(username, userData) {
        return super.put('users/' + username + '/data', userData)
    }

    updateUserData(username, userData) {
        return super.patch('users/' + username + '/data', userData)
    }

    deleteUserData(username) {
        return super.delete('users/' + username + '/data');
    }

}

module.exports = UsersClient;