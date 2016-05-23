var testFixture = require('../globals');

describe('Projects Rest Client', function () {
    var expect = testFixture.expect,
        Q = testFixture.Q,
        gmeConfig = testFixture.getGmeConfig(),
        Rest = require('../../src/client/rest_client/restClient'),
        logger = testFixture.logger.fork('projects'),
        server,
        rest,
        PROJECT1 = 'PROJECT1',
        PROJECT2 = 'PROJECT2',
        storage,
        gmeAuth;

    before(function (done) {
        testFixture.clearDBAndGetGMEAuth(gmeConfig)
            .then(function (gmeAuth_) {
                gmeAuth = gmeAuth_;
                storage = testFixture.getMongoStorage(logger, gmeConfig, gmeAuth);
                return storage.openDatabase();
            })
            .then(function () {
                return Q.allDone([
                    gmeAuth.addUser('user', 'user@example.com', 'pass', true, {overwrite: true})
                ]);
            })
            .then(function () {
                return Q.allDone([
                    testFixture.importProject(storage, {
                        projectSeed: testFixture.SEED_DIR + 'EmptyProject.webgmex',
                        projectName: PROJECT1,
                        gmeConfig: gmeConfig,
                        logger: logger
                    }),
                    testFixture.importProject(storage, {
                        projectSeed: testFixture.SEED_DIR + 'EmptyProject.webgmex',
                        projectName: PROJECT2,
                        gmeConfig: gmeConfig,
                        logger: logger
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
            gmeAuth.unload(),
            storage.closeDatabase()
        ])
            .nodeify(done);
    });

    it('should list all the projects (which at first is 2)', function(done) {
        logger.debug(rest.projects);
        rest.projects.getAllProjects()
            .then(function(projects) {
                console.log('Projects: ', projects);
                expect(projects.length).to.deep.equal(2);
                done();
            })
            .catch(done);
    });

    it('should list last commit date', function(done) {
        console.log(rest.projects);
        rest.projects.getLastModified('guest', 'guest+PROJECT1')
            .then(function(date) {
                console.log(date);
                done();
            })
            .catch(done);
    });

    it('should add a new project', function(done) {
        var newProj = {type: 'file', seedName: 'EmptyProject', ownerId: 'guest'};

        rest.projects.getAllProjects()
            .then(function(projectsData) {
                logger.debug('Before Project data: ', projectsData);
                expect(projectsData.length).to.deep.equal(2);
                return rest.projects.addProject('guest', 'myProject', newProj);
            })
            .then(function() {
                return rest.projects.getAllProjects();
            })
            .then(function(projectData) {
                logger.debug('After project data: ', projectData);
                expect(projectData.length).to.equal(3);
                return rest.projects.deleteProject('guest', 'myProject');
            })
            .then(function() {
                return rest.projects.getAllProjects();
            })
            .then(function(projectData) {
                logger.debug('After project deleted: ', projectData);
                expect(projectData.length).to.equal(2);
                done();
            })
            .catch(done);
    });
});
