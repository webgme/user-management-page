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

        it('should list the guest email', function (done) {
            rest.user.getCurrentUser()
                .then(function (userData) {
                    console.log(userData);
                    expect(userData['email']).to.equal('guest@example.com');
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

    describe('user(s) client', function () {
        var server = testFixture.WebGME.standaloneServer(gmeConfig),
            rest;

        before(function (done) {
            rest = new Rest(server.getUrl() + '/api/');
            server.start(done);
        });

        after(function (done) {
            server.stop(done);
        });

        it('should list the users on the server', function (done) {
            console.log('rest', rest);
            console.log(rest.users);
            rest.users.getAllUsers()
                .then(function (usersData) {
                    console.log(usersData);
                    expect(usersData[0]._id).to.equal('guest');
                    done();
                })
                .catch(function (err){
                    done(err);
                });
        });

    });

    describe('projects client', function () {
        var server = testFixture.WebGME.standaloneServer(gmeConfig),
            rest;

        before(function (done) {
            rest = new Rest(server.getUrl() + '/api/');
            server.start(done);
        });

        after(function (done) {
            server.stop(done);
        });

        it('should list all the projects (which is empty)', function (done) {
            console.log('rest', rest);
            console.log(rest.projects);
            rest.projects.getAllProjects()
                .then(function (projectsData) {
                    console.log(projectsData);
                    expect(projectsData).to.deep.equal([]);
                    done();
                })
                .catch(function (err){
                    done(err);
                });
        });

    });

    describe('organizations client', function () {
        var server = testFixture.WebGME.standaloneServer(gmeConfig),
            rest;

        before(function (done) {
            rest = new Rest(server.getUrl() + '/api/');
            server.start(done);
        });

        after(function (done) {
            server.stop(done);
        });

        it('should list all the organizations (which is empty)', function (done) {
            console.log('rest', rest);
            console.log(rest.organizations);
            rest.organizations.getAllOrganizations()
                .then(function (organizationsData) {
                    console.log(organizationsData);
                    expect(organizationsData).to.deep.equal([]);
                    done();
                })
                .catch(function (err){
                    done(err);
                });
        });

    });
});