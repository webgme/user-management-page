/* eslint-env mocha, node */
var testFixture = require('../globals');

describe('Projects Rest Client', function() {
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
    this.timeout(5000);

    gmeConfig.server.port += 2;
    before(function(done) {
        this.timeout(10000);
        testFixture.clearDBAndGetGMEAuth(gmeConfig)
            .then(function(gmeAuth_) {
                gmeAuth = gmeAuth_;
                storage = testFixture.getMongoStorage(logger, gmeConfig, gmeAuth);
                return storage.openDatabase();
            })
            .then(function() {
                return Q.allDone([
                    gmeAuth.addUser('user', 'user@example.com', 'pass', true, {overwrite: true}),
                    gmeAuth.addUser('guest', 'guest@example.com', 'pass', true, {overwrite: true, siteAdmin: true})
                ]);
            })
            .then(function() {
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
            gmeAuth.unload(),
            storage.closeDatabase()
        ])
            .nodeify(done);
    });

    it('should list all the projects (which at first is 2)', function(done) {
        logger.debug(rest.projects);
        rest.projects.getAllProjects()
            .then(function(projects) {
                logger.debug('Projects: ', projects);
                expect(projects.length).to.deep.equal(2);
                done();
            })
            .catch(done);
    });

    it('should list last modified date', function(done) {
        rest.projects.getProject('guest', 'PROJECT1')
            .then(function(projectData) {
                expect(typeof projectData.info.modifiedAt).to.equal('string');
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

    it('should delete a new project', function(done) {
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

    it('should update a project', function(done) {
        var newProj = {type: 'file', seedName: 'EmptyProject', ownerId: 'guest'};
        var newData = {modifiedAt: "2016-06-07T22:24:08.713Z"};
        var holdOldData;

        rest.projects.addProject('guest', 'myProject', newProj)
            .then(function() {
                return rest.projects.getProject('guest', 'myProject');
            })
            .then(function(projectData) {
                logger.debug('project data: ', projectData);
                holdOldData = projectData;
                return rest.projects.updateProject('guest', 'myProject', newData);
            })
            .then(function() {
                return rest.projects.getProject('guest', 'myProject');
            })
            .then(function(projectData) {
                logger.debug('After project deleted: ', projectData);
                expect(projectData.length).to.not.deep.equal(holdOldData);
                done();
            })
            .catch(done);
    });

    it.skip('should remove/grant rights to a project', function(done) {

        var holdOldProjects;
        rest.users.getUser('user')
            .then(function(userData) {
                logger.debug('User data: ', userData);
                holdOldProjects = userData.projects;
                return rest.projects.grantRightsToProject('guest', 'PROJECT1', 'user', 'rwd');
            })
            .then(function() {
                return rest.users.getUser('user');
            })
            .then(function(userData) {
                logger.debug('New user data!: ', userData);
                expect(holdOldProjects).to.not.deep.equal(userData.projects);
                return rest.projects.removeRightsToProject('guest', 'PROJECT1', 'user');
            })
            .then(function() {
                logger.debug('I removed his rights');
                return rest.users.getUser('user');
            })
            .then(function(userData) {
                logger.debug('After removing: ', userData);
                done();
            });
    });

    it('should get latest commits, query of 50', function(done) {
        rest.projects.getLatestCommits('guest', 'PROJECT1', 50)
            .then(function(latestCommits) {
                logger.debug('50 or less latest commits: ', latestCommits);
                expect(latestCommits).to.have.length.below(51);
                done();
            });
    });

    it('should get latest commits, use default 100', function(done) {
        rest.projects.getLatestCommits('guest', 'PROJECT1')
            .then(function(latestCommits) {
                logger.debug('100 or less latest commits: ', latestCommits);
                expect(latestCommits).to.have.length.below(101);
                done();
            });
    });

    it('should get commit by id', function(done) {
        rest.projects.getCommitById('guest', 'PROJECT1', '#8a170dca622573eb0f3f31e8dbe1f81cf3dd3218')
            .then(function(commitData) {
                logger.debug('Commit data: ', commitData);
                expect(commitData).to.not.equal({});
                done();
            });
    });

    it('should get all branches', function(done) {
        rest.projects.getAllBranches('guest', 'PROJECT1')
            .then(function(allBranches) {
                logger.debug('All branches:' ,allBranches);
                expect(allBranches.hasOwnProperty('master')).to.equal(true); // always master
                done();
            });
    });

    it('should get branch by branchId', function(done) {
        rest.projects.getBranch('guest', 'PROJECT1', 'master')
            .then(function(masterBranch) {
                logger.debug('master branch', masterBranch);
                expect(masterBranch.branchName).to.equal('master');
                done();
            });
    });

    // TODO: add this back after making a commit
    it.skip('should add and delete a branch', function(done) {
        var holdOldBranches;

        rest.projects.addBranch('guest', 'PROJECT1', 'newBranch', {"hash": "#f2a624d9cfbf883c927b04dd45800ba55537dff5"})
            .then(function() {
                return rest.projects.getAllBranches('guest', 'PROJECT1');
            })
            .then(function(allBranches) {
                holdOldBranches = allBranches;
                logger.debug('All branches: ', allBranches);
                return rest.projects.deleteBranch('guest', 'PROJECT1', 'newBranch');
            })
            .then(function() {
                return rest.projects.getAllBranches('guest', 'PROJECT1');
            })
            .then(function(allBranches) {
                expect(allBranches).to.not.deep.equal(holdOldBranches);
                done();
            });
    });

    // TODO: add this back after making a commit
    it.skip('should update a branch', function(done) {
        var holdOldBranch;

        rest.projects.getBranch('guest', 'PROJECT1', 'master')
            .then(function(masterBranch) {
                logger.debug('master branch', masterBranch);
                holdOldBranch = masterBranch;
                expect(masterBranch.branchName).to.equal('master');
                return rest.projects.updateBranch('guest', 'PROJECT1', 'master', {"oldHash": "#actualOldHash","newHash": "#actualNewHash"});
            })
            .then(function() {
                return rest.projects.getBranch('guest', 'PROJECT1', 'master');
            })
            .then(function(masterBranch) {
                expect(masterBranch).to.not.equal(holdOldBranch);
                done();
            });
    });

    it('should get latest commits by branch (query of 50)', function(done) {
        rest.projects.getLatestCommitsByBranch('guest', 'PROJECT1', 'master', 50)
            .then(function(latestCommitsToMaster) {
                logger.debug('latest commits to master: ', latestCommitsToMaster);
                expect(latestCommitsToMaster).to.have.length.below(51);
                done();
            });
    });

    it('should get latest commits by branch (default 100)', function(done) {
        rest.projects.getLatestCommitsByBranch('guest', 'PROJECT1', 'master')
            .then(function(latestCommitsToMaster) {
                logger.debug('latest commits to master: ', latestCommitsToMaster);
                expect(latestCommitsToMaster).to.have.length.below(101);
                done();
            });
    });

    it('should get all project tags', function(done) {
        rest.projects.getProjectTags('guest', 'PROJECT1')
            .then(function(projectTags) {
                logger.debug('project tags: ', projectTags);
                expect(typeof projectTags).to.equal('object');
                done();
            });
    });

    // TODO: add this back after commit (needs commit to assign a tag)
    it.skip('should add tag to project', function(done) {
        rest.projects.addTag('guest', 'PROJECT1', 'justAddedTag', {"hash": "#myMadeUpHash"})
            .then(function() {
                return rest.projects.getTag('guest', 'PROJECT1', 'justAddedTag');
            })
            .then(function(tagData) {
                logger.debug('tag data: ', tagData);
                done();
            });
    });

});
