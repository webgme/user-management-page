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

    getCurrentUser () {
        return super
            .get('user');
            //.then( function (response) {
            //    //this.saveUser = response;
            //    console.log('Data fetched: ', response);
            //    console.log('ID should be: ' , response['_id']);
            //    console.log('Email should be: ', response['email']);
            //})
            //.catch ( function (error) {
            //    console.log('Error fetching data. ', error);
            //});
    }

    getCurrentUserData (dataField) {
        //console.log('Requested field: ', dataField, ' - ', this.saveUser[dataField]);
    }

}

module.exports = UserClient;