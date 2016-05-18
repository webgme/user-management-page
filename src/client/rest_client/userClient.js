import BaseClient from './baseClient'

class UserClient extends BaseClient {

    constructor(baseUrl) {
        super(baseUrl);
    }

    getCurrentUser() {
        return super.get('user');
    }
    
    deleteCurrentUser() {
        return super.delete('user')
    }

    getCurrentUserData() {
        return super.get('user/data');
    }
    
    setCurrentUserData(value) {
        return super.put('user/data', value);
    }
    
    updateCurrentUserData(value) {
        return super.put('user/data', value);
    }

    deleteCurrentUserData(value) {
        return super.delete('user/data');
    }
    
}

module.exports = UserClient;