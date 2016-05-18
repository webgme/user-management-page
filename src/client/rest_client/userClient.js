import BaseClient from './baseClient'

class UserClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    //Methods that should be in user:
    // - getCurrentUser
    // - deleteCurrentUser
    // - getCurrentUser : data field
    // - addDataToUser
    // - updateUserData
    // -

    getCurrentUser() {
        return super
            .get('user');
    }
    
    deleteCurrentUser() {
        return super
            .delete('user')
            .then( function() {
                console.log('Successfully deleted user');
            }).catch( function() {
                console.log('Error deleting user.');
            });
    }

    getCurrentUserData() {
        return super.get('user/data');
    }
    
    setCurrentUserData(value) {
        return super.put('user/data', value);
    }
    
}

module.exports = UserClient;