/* eslint-env mocha */
/* eslint-env node */
var testFixture = require('../globals');

describe('Users Rest Client', function() {
    var expect = testFixture.expect,
        Q = testFixture.Q,
        gmeConfig = testFixture.getGmeConfig(),
        Rest = require('../../src/client/rest_client/restClient'),
        logger = testFixture.logger.fork('users'),
        server,
        rest,
        gmeAuth;

    gmeConfig.server.port += 4;
    before(function(done) {
        testFixture.clearDBAndGetGMEAuth(gmeConfig)
            .then(function(gmeAuth_) {
                gmeAuth = gmeAuth_;
            })
            .then(function() {
                return Q.allDone([
                    gmeAuth.addUser('user', 'user@example.com', 'pass', true, {overwrite: true}),
                    gmeAuth.addUser('test', 'test@example.com', 'pass', true, {overwrite: true, siteAdmin: true}),
                    gmeAuth.addUser('guest', 'guest@example.com', 'pass', true, {overwrite: true, siteAdmin: true})
                ]);
            })
            .then(function() {
                return Q.allDone([
                    gmeAuth.authorizeByUserId('user', 'user+project', 'create', {
                        read: true,
                        write: true,
                        delete: true
                    }),
                    gmeAuth.authorizeByUserId('guest', 'guest+project', 'create', {
                        read: true,
                        write: true,
                        delete: true
                    })
                ]);
            })
            .then(function() {
                server = testFixture.WebGME.standaloneServer(gmeConfig);
                rest = new Rest(server.getUrl() + '/api/');
                return Q.ninvoke(server, 'start');
            })
            .nodeify(done);
    });

    after(function(done) {
        Q.allDone([
            Q.ninvoke(server, 'stop'),
            gmeAuth.unload()
        ])
            .nodeify(done);
    });

    it('should list all the users on the server', function(done) {
        logger.debug('rest', rest);
        logger.debug(rest.users);
        rest.users.getAllUsers()
            .then(function(usersData) {
                logger.debug(usersData);
                expect(typeof usersData[0]._id).to.equal('string');
                done();
            })
            .catch(done);
    });

    it('should list specific user by username', function(done) {
        rest.users.getUser('test')
            .then(function(userData) {
                logger.debug(userData);
                expect(userData.email).to.equal('test@example.com');
                done();
            })
            .catch(done);
    });

    it('should list specific user\'s data', function(done) {
        rest.users.getAllUsers()
            .then(function(usersList) {
                logger.debug('Initial: ', usersList);
            })
            .then(function() {
                return rest.user.setCurrentUserData({customData: 'myUpdatedData'});
            })
            .then(function() {
                return rest.users.getUserData('guest');
            })
            .then(function(userData) {
                logger.debug('User data:', userData);
                expect(userData).to.deep.equal({customData: 'myUpdatedData'});
                return rest.users.getAllUsers();
            })
            .then(function(usersList) {
                logger.debug('After: ', usersList);
                done();
            })
            .catch(done);
    });

    it('should update a user', function(done) {
        var newUserObj = {email: 'newPatchedEmail@test.com'};

        rest.users.getUser('guest')
            .then(function(guestUser) {
                logger.debug('Before: ', guestUser);
                expect(guestUser.email).to.equal('guest@example.com');
                return rest.users.updateUser('guest', newUserObj);
            })
            .then(function() {
                return rest.users.getUser('guest');
            })
            .then(function(guestUser) {
                logger.debug('After: ', guestUser);
                expect(guestUser.email).to.equal(newUserObj.email);
                done();
            })
            .catch(done);
    });

    it('should delete a user', function(done) {
        rest.users.getAllUsers()
            .then(function(allUsers) {
                logger.debug('Before: ', allUsers);
                expect(allUsers.length).to.equal(4);
            })
            .then(function() {
                return rest.users.deleteUser('test');
            })
            .then(function() {
                return rest.users.getAllUsers();
            })
            .then(function(allUsers) {
                logger.debug('After: ', allUsers);
                expect(allUsers.length).to.equal(3);
                done();
            })
            .catch(done);
    });

    it('should add a new user', function(done) {

        var justAddedBody = {
            password: 'pass',
            email: 'justAdded@example.com',
            canCreate: true
        };

        rest.users.getAllUsers()
            .then(function(usersList) {
                logger.debug('Initial: ', usersList);
            })
            .then(function() {
                return rest.users.addUser('justAdded', justAddedBody);
            })
            .then(function() {
                return rest.users.getUser('justAdded');
            })
            .then(function(user) {
                logger.debug('User data:', user);
                expect(user.email).to.equal(justAddedBody.email);
                return rest.users.getAllUsers();
            })
            .then(function(usersList) {
                logger.debug('After: ', usersList);
                done();
            })
            .catch(done);
    });

    it('should get a user\'s data', function(done) {

        // Test was deleted, can't use
        rest.users.getUserData('admin')
            .then(function(userData) {
                logger.debug('Before: (should be {})', userData);
                expect(userData).to.deep.equal({});
                done();
            })
            .catch(done);
    });

    it('should set a user\'s data', function(done) {
        var newData = {
            customData: 'myData'
        };

        logger.debug('getting user admin\'s data');
        rest.users.getUserData('admin')
            .then(function(userData) {
                logger.debug('Before: (should be {})', userData);
                return rest.users.setUserData('admin', newData);
            })
            .then(function() {
                return rest.users.getUserData('admin');
            })
            .then(function(userData) {
                logger.debug('After: ', userData);
                expect(userData).to.deep.equal(newData);
                done();
            })
            .catch(done);
    });

    it('should update a user\'s data', function(done) {
        var oldData = {customData: 'myData'};
        var updatedData = {customData: 'myUpdatedData'};

        rest.users.setUserData('admin', oldData)
            .then(function(userData) {
                logger.debug('Before: ', userData);
                expect(userData).to.deep.equal(oldData);
                return rest.users.updateUserData('admin', updatedData);
            })
            .then(function() {
                return rest.users.getUserData('admin');
            })
            .then(function(userData) {
                logger.debug('After: ', userData);
                expect(userData).to.deep.equal(updatedData);
                done();
            })
            .catch(done);
    });

    it('should delete a user\'s data', function(done) {
        var oldData = {customData: 'myUpdatedData'};

        rest.users.setUserData('admin', oldData)
            .then(function() {
                return rest.users.getUserData('admin');
            })
            .then(function(userData) {
                logger.debug('Before: ', userData);
                expect(userData).to.deep.equal(oldData);
                return rest.users.deleteUserData('admin');
            })
            .then(function() {
                return rest.users.getUserData('admin');
            })
            .then(function(userData) {
                logger.debug('After: ', userData);
                expect(userData).to.deep.equal({});
                done();
            })
            .catch(done);
    });

});
