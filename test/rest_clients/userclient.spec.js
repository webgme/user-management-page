/* eslint-env node, mocha*/
var testFixture = require('../globals');

describe('User Rest Client', function() {
    var expect = testFixture.expect,
        Q = testFixture.Q,
        gmeConfig = testFixture.getGmeConfig(),
        Rest = require('../../src/client/rest_client/restClient'),
        logger = testFixture.logger.fork('user'),
        server,
        rest,
        gmeAuth;

    gmeConfig.server.port += 3;
    before(function(done) {
        this.timeout(10000);
        testFixture.clearDBAndGetGMEAuth(gmeConfig)
            .then(function(gmeAuth_) {
                gmeAuth = gmeAuth_;
            })
            .then(function() {
                return Q.allDone([
                    gmeAuth.addUser('user', 'user@example.com', 'pass', true, {overwrite: true}),
                    gmeAuth.addUser('test', 'test@example.com', 'pass', true, {overwrite: true})
                ]);
            })
            .then(function() {
                return Q.allDone([
                    gmeAuth.authorizeByUserId('user', 'user+project', 'create', {
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

    it('should list the guest (current user)', function(done) {
        logger.debug('rest', rest);
        logger.debug(rest.user);
        rest.user.getCurrentUser()
            .then(function(userData) {
                logger.debug(userData);
                expect(userData._id).to.equal('guest');
                done();
            })
            .catch(done);
    });

    it('should list the guest email', function(done) {
        rest.user.getCurrentUser()
            .then(function(userData) {
                logger.debug(userData);
                logger.debug('\nEmail: ', userData.email);
                expect(userData.email).to.equal('guest@example.com');
                done();
            })
            .catch(done);
    });

    it('should update the user', function(done) {
        var newUserObj = {email: 'newPatchedEmail@test.com'};

        rest.user.getCurrentUser()
            .then(function(user) {
                logger.debug('Before: ', user);
                expect(user.email).to.deep.equal('guest@example.com');
                return rest.user.updateCurrentUser(newUserObj);
            })
            .then(function() {
                return rest.user.getCurrentUser();
            })
            .then(function(user) {
                logger.debug('After: ', user);
                expect(user.email).to.deep.equal('newPatchedEmail@test.com');
                done();
            })
            .catch(done);
    });

    it('should set the user data', function(done) {
        var newData = {
            customData: 'myData'
        };

        rest.user.getCurrentUserData()
            .then(function(userData) {
                logger.debug(userData);
                expect(userData).to.deep.equal({});
                return rest.user.setCurrentUserData(newData);
            })
            .then(function(userData) {
                logger.debug(userData);
                return rest.user.getCurrentUserData();
            })
            .then(function(userData) {
                expect(userData).to.deep.equal(newData);
                done();
            })
            .catch(done);
    });

    it('should get the user data', function(done) {
        var currentData = {customData: 'myData'};

        rest.user.getCurrentUserData()
            .then(function(userData) {
                logger.debug(userData);
                expect(userData).to.deep.equal(currentData);
                done();
            })
            .catch(done);
    });

    it('should update the user data', function(done) {
        var oldData = {customData: 'myData'};
        var updatedData = {customData: 'myUpdatedData'};

        rest.user.getCurrentUserData()
            .then(function(userData) {
                logger.debug('Before: ', userData);
                expect(userData).to.deep.equal(oldData);
                return rest.user.updateCurrentUserData(updatedData);
            })
            .then(function(userData) {
                logger.debug(userData);
                return rest.user.getCurrentUserData();
            })
            .then(function(userData) {
                logger.debug('After: ', userData);
                expect(userData).to.deep.equal(updatedData);
                done();
            })
            .catch(done);
    });

    it('should delete the user data', function(done) {
        var oldData = {customData: 'myUpdatedData'};

        rest.user.getCurrentUserData()
            .then(function(userData) {
                logger.debug('Before: ', userData);
                expect(userData).to.deep.equal(oldData);
                return rest.user.deleteCurrentUserData();
            })
            .then(function() {
                return rest.user.getCurrentUserData();
            })
            .then(function(userData) {
                logger.debug('After: ', userData);
                expect(userData).to.deep.equal({});
                done();
            })
            .catch(done);
    });

    it('should delete the current user', function(done) {
        rest.users.getAllUsers()
            .then(function(usersList) {
                logger.debug('Before deleting: ', usersList);
            })
            .then(function() {
                return rest.user.deleteCurrentUser();
            })
            .then(function() {
                return gmeAuth.listUsers();
            })
            .then(function(usersList) {
                logger.debug('After deleting: ', usersList);
                // 4 accounts (guest, test, user, admin, should be 3 after deleting guest)
                expect(usersList.length).to.deep.equal(3);
                done();
            })
            .catch(done);
    });
});
