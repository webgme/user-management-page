/* eslint-env mocha */
/* global require */
var testFixture = require('../globals');

describe('Organizations Rest Client', function() {
    var expect = testFixture.expect,
        Q = testFixture.Q,
        gmeConfig = testFixture.getGmeConfig(),
        Rest = require('../../src/client/rest_client/restClient'),
        logger = testFixture.logger.fork('organizations'),
        server,
        rest,
        gmeAuth;

    gmeConfig.server.port += 1;
    before(function(done) {
        testFixture.clearDBAndGetGMEAuth(gmeConfig)
            .then(function(gmeAuth_) {
                gmeAuth = gmeAuth_;
            })
            .then(function() {
                return Q.allDone([
                    gmeAuth.addUser('userOrgA', 'user@example.com', 'pass', true, {overwrite: true}),
                    gmeAuth.addUser('userOrgAB', 'test@example.com', 'pass', true, {overwrite: true}),
                    gmeAuth.addUser('userOrgB', 'test@example.com', 'pass', true, {overwrite: true}),
                    gmeAuth.addUser('guest', 'guest@example.com', 'pass', true, {overwrite: true, siteAdmin: true}),
                    gmeAuth.addOrganization('orgA', {someInfo: true})
                    // TODO: Add and org B and maybe an empty one
                ]);
            })
            .then(function() {
                var projectAuthParams = {
                    entityType: gmeAuth.authorizer.ENTITY_TYPES.PROJECT
                };
                return Q.allDone([
                    gmeAuth.authorizer.setAccessRights('orgA', 'user+project', {
                        read: true,
                        write: true,
                        delete: true
                    }, projectAuthParams),
                    gmeAuth.addUserToOrganization('userOrgA', 'orgA'),
                    gmeAuth.setAdminForUserInOrganization('userOrgA', 'orgA', true)
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

    it('should list all the organizations', function(done) {
        logger.debug('rest', rest);
        logger.debug(rest.organizations);
        rest.organizations.getAllOrganizations()
            .then(function(allOrganizations) {
                logger.debug(allOrganizations);
                expect(allOrganizations instanceof Array).to.equal(true);
                done();
            })
            .catch(done);
    });

    it('should show specified organizations data', function(done) {
        rest.organizations.getOrganization('orgA')
            .then(function(organizationsData) {
                logger.debug(organizationsData);
                expect(typeof organizationsData).to.equal('object');
                done();
            })
            .catch(done);
    });

    it('should create an organization', function(done) {
        var numOrgsBefore;

        rest.organizations.getAllOrganizations()
            .then(function(allOrganizations) {
                numOrgsBefore = allOrganizations.length;
            })
            .then(function() {
                return rest.organizations.createOrganization('newlyCreatedOrg', {someOtherInfo: false});
            })
            .then(function() {
                return rest.organizations.getAllOrganizations();
            })
            .then(function(allOrganizations) {
                expect(allOrganizations.length).to.equal(numOrgsBefore + 1);
                // Delete after test to have easy to maintain tests
                return rest.organizations.deleteOrganization('newlyCreatedOrg');
            })
            .then(function() {
                done();
            })
            .catch(done);
    });

    it('should delete an organization', function(done) {
        var numOrgsBefore;

        rest.organizations.getAllOrganizations()
            .then(function(allOrganizations) {
                logger.debug('All orgs: ', allOrganizations);
                numOrgsBefore = allOrganizations.length;
            })
            .then(function() {
                return rest.organizations.createOrganization('orgToBeDeleted', {a: 0});
            })
            .then(function() {
                return rest.organizations.getAllOrganizations();
            })
            .then(function(allOrganizations) {
                logger.debug('All orgs after: ', allOrganizations);
                expect(allOrganizations.length).to.equal(numOrgsBefore + 1);
                return rest.organizations.deleteOrganization('orgToBeDeleted');
            })
            .then(function() {
                return rest.organizations.getAllOrganizations();
            })
            .then(function(allOrganizations) {
                logger.debug('After deleting: ', allOrganizations);
                expect(allOrganizations.length).to.equal(numOrgsBefore);
                done();
            })
            .catch(done);
    });

    it('should add a user to an organization', function(done) {
        var numUsersInOrgBefore;

        rest.organizations.getOrganization('orgA')
            .then(function(orgAData) {
                logger.debug('AData: ', orgAData);
                numUsersInOrgBefore = orgAData.users.length;
                return rest.organizations.addUserToOrganization('orgA', 'userOrgB');
            })
            .then(function() {
                return rest.organizations.getOrganization('orgA');
            })
            .then(function(orgAData) {
                logger.debug('A data: ', orgAData);
                expect(orgAData.users.length).to.equal(numUsersInOrgBefore + 1);
                return rest.organizations.deleteUserFromOrganization('orgA', 'userOrgB');
            })
            .then(function() {
                return rest.organizations.getOrganization('orgA');
            })
            .then(function(orgAData) {
                logger.debug('A data: ', orgAData);
                expect(orgAData.users.length).to.equal(numUsersInOrgBefore);
                done();
            })
            .catch(done);
    });

    it('should delete a user from an organization', function(done) {
        var numUsersInOrgBefore;

        rest.organizations.getOrganization('orgA')
            .then(function(orgAData) {
                logger.debug('AData: ', orgAData);
                numUsersInOrgBefore = orgAData.users.length;
                return rest.organizations.addUserToOrganization('orgA', 'userOrgB');
            })
            .then(function() {
                return rest.organizations.getOrganization('orgA');
            })
            .then(function(orgAData) {
                logger.debug('A data: ', orgAData);
                expect(orgAData.users.length).to.equal(numUsersInOrgBefore + 1);
                return rest.organizations.deleteUserFromOrganization('orgA', 'userOrgB');
            })
            .then(function() {
                return rest.organizations.getOrganization('orgA');
            })
            .then(function(orgAData) {
                logger.debug('A data: ', orgAData);
                expect(orgAData.users.length).to.equal(numUsersInOrgBefore);
                done();
            })
            .catch(done);
    });

    it('should make user admin of an organization', function(done) {
        var numAdminsInOrgBefore;

        rest.organizations.getOrganization('orgA')
            .then(function(orgAData) {
                logger.debug('AData: ', orgAData);
                numAdminsInOrgBefore = orgAData.admins.length;
                return rest.organizations.makeAdminOfOrganization('orgA', 'userOrgB');
            })
            .then(function() {
                return rest.organizations.getOrganization('orgA');
            })
            .then(function(orgAData) {
                logger.debug('A data: ', orgAData);
                expect(orgAData.admins.length).to.equal(numAdminsInOrgBefore + 1);
                return rest.organizations.removeAdminOfOrganization('orgA', 'userOrgB');
            })
            .then(function() {
                return rest.organizations.getOrganization('orgA');
            })
            .then(function(orgAData) {
                logger.debug('A data: ', orgAData);
                expect(orgAData.admins.length).to.equal(numAdminsInOrgBefore);
                done();
            })
            .catch(done);
    });

    it('should remove user as admin of an organization', function(done) {
        var numAdminsInOrgBefore;

        rest.organizations.getOrganization('orgA')
            .then(function(orgAData) {
                logger.debug('AData: ', orgAData);
                numAdminsInOrgBefore = orgAData.admins.length;
                return rest.organizations.makeAdminOfOrganization('orgA', 'userOrgB');
            })
            .then(function() {
                return rest.organizations.getOrganization('orgA');
            })
            .then(function(orgAData) {
                logger.debug('A data: ', orgAData);
                expect(orgAData.admins.length).to.equal(numAdminsInOrgBefore + 1);
                return rest.organizations.removeAdminOfOrganization('orgA', 'userOrgB');
            })
            .then(function() {
                return rest.organizations.getOrganization('orgA');
            })
            .then(function(orgAData) {
                logger.debug('A data: ', orgAData);
                expect(orgAData.admins.length).to.equal(numAdminsInOrgBefore);
                done();
            })
            .catch(done);
    });

});
