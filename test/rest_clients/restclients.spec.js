var testFixture = require('../globals');

describe('rest client test', function () {
    var expect = testFixture.expect,
        Q = testFixture.Q,
        gmeConfig = testFixture.getGmeConfig(),
        Rest = require('../../src/client/rest_client/restClient'),
        gmeAuth;

    before(function (done) {
        testFixture.clearDBAndGetGMEAuth(gmeConfig)
            .then(function (gmeAuth_) {
                gmeAuth = gmeAuth_;
            })
            .then(function () {
                return Q.allDone([
                    gmeAuth.addUser('user', 'user@example.com', 'pass', true, {overwrite: true})
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
            .nodeify(done);
    });

    after(function (done) {
        gmeAuth.unload(done);
    });

    describe('user client', function () {
        var server = testFixture.WebGME.standaloneServer(gmeConfig),
            rest;

        before(function (done) {
            rest = new Rest(server.getUrl() + '/api/');
            server.start(done);
        });

        after(function (done) {
            server.stop(done);
        });

        it('should list the guest', function (done) {
            console.log('rest', rest);
            console.log(rest.user);
            rest.user.getCurrentUser()
                .then(function (userData) {
                    console.log(userData);
                    expect(userData._id).to.equal('guest');
                    done();
                })
                .catch(function (err){
                    done(err);
                });
        });

        it.skip('should list the guest email', function (done) {
            rest.user.getCurrentUserData()
                .then(function (userEmail) {
                    expect(userEmail).to.equal('guest@example.com');
                    done();
                })
                .catch(function (err){
                    done(err);
                });
        });

        it('should set the user data', function (done) {
            var newData = {customData: 'myData'};

            rest.user.getCurrentUserData()
                .then( function(userData) {
                    //console.log(userData);
                    expect(userData).to.deep.equal({});
                    return rest.user.setCurrentUserData(newData);
                }).then(function (userData) {
                    console.log(userData);
                    return rest.user.getCurrentUserData();
                }).then( function(userData) {
                    //console.log(userData);
                    expect(userData).to.deep.equal(newData);
                    done();
                })
                .catch(function (err){
                    done(err);
                });
        });

    });
});