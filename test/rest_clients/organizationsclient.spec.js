var testFixture = require('../globals');

describe('Organizations Rest Client', function () {
    var expect = testFixture.expect,
        Q = testFixture.Q,
        gmeConfig = testFixture.getGmeConfig(),
        Rest = require('../../src/client/rest_client/restClient'),
        logger = testFixture.logger.fork('organizations'),
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
                    gmeAuth.addUser('userOrgA', 'user@example.com', 'pass', true, {overwrite: true}),
                    gmeAuth.addUser('userOrgAB', 'test@example.com', 'pass', true, {overwrite: true}),
                    gmeAuth.addUser('userOrgB', 'test@example.com', 'pass', true, {overwrite: true}),
                    gmeAuth.addOrganization('orgA', {someInfo: true})
                    //TODO: Add and org B and maybe an empty one
                ]);
            })
            .then(function () {
                return Q.allDone([
                    gmeAuth.authorizeOrganization('orgA', 'user+project', 'create', {
                        read: true,
                        write: true,
                        delete: true
                    }),
                    gmeAuth.addUserToOrganization('userOrgA', 'orgA'),
                    gmeAuth.setAdminForUserInOrganization('userOrgA', 'orgA', true)
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

    it('should list all the organizations', function (done) {
        logger.debug('rest', rest);
        logger.debug(rest.organizations);
        rest.organizations.getAllOrganizations()
            .then(function (organizationsData) {
                logger.debug(organizationsData);
                expect(organizationsData instanceof Array).to.deep.equal(true);
                done();
            })
            .catch(done);
    });
});