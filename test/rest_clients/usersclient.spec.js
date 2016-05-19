var testFixture = require('../globals');

describe('Users Rest Client', function () {
    var expect = testFixture.expect,
        Q = testFixture.Q,
        gmeConfig = testFixture.getGmeConfig(),
        Rest = require('../../src/client/rest_client/restClient'),
        logger = testFixture.logger.fork('users'),
        server,
        rest,
        gmeAuth;

    before(function (done) {
        testFixture.clearDBAndGetGMEAuth(gmeConfig)
            .then(function (gmeAuth_) {
                gmeAuth = gmeAuth_;
            })
            .then(function () {
                return Q.allDone([
                    gmeAuth.addUser('user', 'user@example.com', 'pass', true, {overwrite: true}),
                    gmeAuth.addUser('test', 'test@example.com', 'pass', true, {overwrite: true})
                ]);
            })
            .then(function () {
                return Q.allDone([
                    gmeAuth.authorizeByUserId('user', 'user+project', 'create', {
                        read: true,
                        write: true,
                        delete: true
                    })
                ]);
            })
            .then(function () {
                server = testFixture.WebGME.standaloneServer(gmeConfig);
                rest = new Rest(server.getUrl() + '/api/');
                return Q.ninvoke(server, 'start');
            })
            .nodeify(done);
    });

    after(function (done) {
        Q.allDone([
            Q.ninvoke(server, 'stop'),
            gmeAuth.unload()
        ])
            .nodeify(done);
    });

    it('should list all the users on the server', function (done) {
        console.log('rest', rest);
        console.log(rest.users);
        rest.users.getAllUsers()
            .then(function (usersData) {
                console.log(usersData);
                expect(typeof usersData[0]._id).to.equal('string');
                done();
            })
            .catch(function (err){
                done(err);
            });
    });

    it('should list specific user by username', function (done) {
        rest.users.getUser('test')
            .then(function (userData) {
                console.log(userData);
                expect(userData.email).to.equal('test@example.com');
                done();
            })
            .catch(function (err){
                done(err);
            });
    });

    //Unfinished test:
    // it('should add user by username', function (done) {
    //     var userBody = {password: ''}
    //     rest.users.getAllUsers()
    //         .then(function (usersList) {
    //             console.log('Before adding: ', usersList);
    //         })
    //         .then(function () {
    //             rest.users.addUser()
    //         })
    //         .catch(function (err){
    //             done(err);
    //         });
    // });

    it('should list specific user\'s data', function (done) {
        rest.users.getAllUsers()
            .then( function(usersList) {
                console.log('Initial: ', usersList);
            })
            .then (function () {
                return rest.user.setCurrentUserData({customData: 'myUpdatedData'});
            })
            .then( function() {
                return rest.users.getUserData('guest');
            })
            .then( function(userData) {
                console.log('User data:', userData);
                expect(userData).to.deep.equal({customData: 'myUpdatedData'});
                return rest.users.getAllUsers();
            })
            .then( function(usersList) {
                console.log('After: ', usersList);
                done();
            })
            .catch(function (err){
                done(err);
            });
    });
});