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
            rest.user.getCurrentUser()
                .then(function (userData) {
                    expect(userData._id).to.equal('guest');
                    done();
                })
                .catch(function (err){
                    done(err);
                })
        })
    });
});