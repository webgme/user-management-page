/**
 * Utility functions for rest client
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

/**
 * Returns a boolean for if the current user can authorize others to the project
 * @param {Object} user - user object
 * @param {Array} orgs - array of orgs
 * @param {string} ownerId - id of owner
 * @return {boolean} - Boolean on if authorized!
 */
export function canUserAuthorize(user, orgs, ownerId) {
    return user._id === ownerId ||
        orgs.some((org) => {
            return org._id === ownerId && org.admins.indexOf(user._id) !== -1;
        });
}

/**
 * Maps usernames of users with access to a specified project to their respective rights
 * @param {Array} users - all users
 * @param {string} projectId - Id of project
 * @return {Map} map of users to their rights to a specified projects
 */
export function getUsersWithAccessToProject(users, projectId) {
    let userMap = {};
    users.forEach(user => {
        if (user.projects.hasOwnProperty(projectId)) {

            // Building rights string
            let userRightsOrigin = '';
            if (user.projects[projectId].read) {
                userRightsOrigin += 'Read ';
            }
            if (user.projects[projectId].write) {
                userRightsOrigin += 'Write ';
            }
            if (user.projects[projectId].delete) {
                userRightsOrigin += 'Delete ';
            }

            userMap[user._id] = {
                read: user.projects[projectId].read,
                write: user.projects[projectId].write,
                delete: user.projects[projectId].delete,
                inOrg: false,
                userRightsOrigin: [userRightsOrigin],
                orgsRightsOrigin: []
            };
        }
    });
    return userMap;
}

/**
) * Hashes the names of all organizations with access to their respective rights
 * @param {Array} orgs - array of all orgs
 * @param {string} projectId - id of project
 * @return {Map} (Had to resolve the map to use it in parallel with another async function)
 */
export function getOrganizationsWithAccessToProject(orgs, projectId) {
    let orgToRights = {};

    orgs.forEach(org => {
        if (org.projects.hasOwnProperty(projectId)) {

            let orgsRightsOrigin = '';
            if (org.projects[projectId].read) {
                orgsRightsOrigin += 'Read ';
            }
            if (org.projects[projectId].write) {
                orgsRightsOrigin += 'Write ';
            }
            if (org.projects[projectId].delete) {
                orgsRightsOrigin += 'Delete ';
            }

            orgToRights[org._id] = org.projects[projectId];
            orgToRights[org._id].orgsRightsOrigin = orgToRights[org._id].orgsRightsOrigin ? orgToRights[org._id].orgsRightsOrigin.concat([org._id + ': ' + orgsRightsOrigin]) : [org._id + ': ' + orgsRightsOrigin];
        }
    });
    return orgToRights;
}

/**
 * Hashes the names of users in specified list of organizations to their respective rights
 * @param {Array} orgs - array of all orgs
 * @param {string} projectId - id of project
 * @return {Map} returns map of the users in the specified list of organizations (names to rights)
 */
export function getUsersInOrganizationsWithAccessToProject(orgs, projectId) {
    let userToOrgsRights = {};

    orgs.forEach(org => {
        if (org.projects.hasOwnProperty(projectId)) {

            let orgsRightsOrigin = '';
            if (org.projects[projectId].read) {
                orgsRightsOrigin += 'Read ';
            }
            if (org.projects[projectId].write) {
                orgsRightsOrigin += 'Write ';
            }
            if (org.projects[projectId].delete) {
                orgsRightsOrigin += 'Delete ';
            }

            org.users.forEach(user => {
                if (userToOrgsRights[user]) { // If in multiple organizations
                    userToOrgsRights[user] = {
                        read: userToOrgsRights[user].read || org.projects[projectId].read,
                        write: userToOrgsRights[user].write || org.projects[projectId].write,
                        delete: userToOrgsRights[user].delete || org.projects[projectId].delete,
                        inOrg: true,
                        orgsRightsOrigin: userToOrgsRights[user].orgsRightsOrigin.concat([org._id + ': ' + orgsRightsOrigin])
                    };
                } else {
                    userToOrgsRights[user] = JSON.parse(JSON.stringify(org.projects[projectId]));
                    userToOrgsRights[user].inOrg = true;
                    userToOrgsRights[user].orgsRightsOrigin = userToOrgsRights[user].orgsRightsOrigin ? userToOrgsRights[user].orgsRightsOrigin.concat([org._id + ': ' + orgsRightsOrigin]) : [org._id + ': ' + orgsRightsOrigin];
                }
            });
        }
    });
    return userToOrgsRights;
}
