/**
 * Utility functions for rest client
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import { isEmpty } from './utils';

/**
 * Returns a boolean for if the current user can authorize others to the project
 * @param {Object} user - user object
 * @param {Array} orgs - array of orgs
 * @param {string} ownerId - id of owner
 * @return {boolean} - Boolean on if authorized!
 */
export function canUserAuthorize(user, orgs, ownerId) {
    return user.siteAdmin || user._id === ownerId ||
        orgs.some((org) => {
            return org._id === ownerId || org.admins.indexOf(user._id) !== -1;
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

            orgToRights[org._id] = JSON.parse(JSON.stringify(org.projects[projectId]));
            orgToRights[org._id].orgsRightsOrigin = orgToRights[org._id].orgsRightsOrigin ? orgToRights[org._id].orgsRightsOrigin.concat([org._id + ': ' + orgsRightsOrigin]) : [org._id + ': ' + orgsRightsOrigin]; // eslint-disable-line max-len
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
                        orgsRightsOrigin: userToOrgsRights[user].orgsRightsOrigin.concat([org._id + ': ' + orgsRightsOrigin]) // eslint-disable-line max-len
                    };
                } else {
                    userToOrgsRights[user] = JSON.parse(JSON.stringify(org.projects[projectId]));
                    userToOrgsRights[user].inOrg = true;
                    userToOrgsRights[user].orgsRightsOrigin = userToOrgsRights[user].orgsRightsOrigin ? userToOrgsRights[user].orgsRightsOrigin.concat([org._id + ': ' + orgsRightsOrigin]) : [org._id + ': ' + orgsRightsOrigin]; // eslint-disable-line max-len
                }
            });
        }
    });
    return userToOrgsRights;
}

/**
 * Retrieves collaborators of a specified project
 * @param {Array} organizations - list of all orgs
 * @param {Array} users - list of all users
 * @param {string} projectId - projectId
 * @return {{userCollaborators: Array.<Object>, organizationCollaborators: Array.<Object>}} - computed collaborators
 */
export function retrieveCollaborators(organizations, users, projectId) {

    let usersWithAccess = getUsersWithAccessToProject(users, projectId),
        usersInOrganizationsWithAccess = getUsersInOrganizationsWithAccessToProject(organizations, projectId),
        organizationsWithAccess = getOrganizationsWithAccessToProject(organizations, projectId);

    // Union of rights if in organization
    if (isEmpty(usersInOrganizationsWithAccess)) {
        // Do nothing because then usersWithAccess is just self and does not need to be modified
    } else {
        Object.keys(usersInOrganizationsWithAccess).forEach(user => {
            if (usersWithAccess[user]) {
                usersWithAccess[user].read = usersWithAccess[user].read || usersInOrganizationsWithAccess[user].read; // eslint-disable-line max-len
                usersWithAccess[user].write = usersWithAccess[user].write || usersInOrganizationsWithAccess[user].write; // eslint-disable-line max-len
                usersWithAccess[user].delete = usersWithAccess[user].delete || usersInOrganizationsWithAccess[user].delete; // eslint-disable-line max-len
                usersWithAccess[user].orgsRightsOrigin = usersInOrganizationsWithAccess[user].orgsRightsOrigin;
            } else {
                usersWithAccess[user] = JSON.parse(JSON.stringify(usersInOrganizationsWithAccess[user]));
            }
        });
    }

    let userCollaborators = [];
    let organizationCollaborators = [];
    Object.keys(usersWithAccess).forEach(user => {
        userCollaborators.push({
            inOrg: usersWithAccess[user].inOrg,
            name: user,
            orgsRightsOrigin: usersWithAccess[user].orgsRightsOrigin,
            rights: usersWithAccess[user].delete ? 'Read Write Delete' :
                    usersWithAccess[user].write ? 'Read Write' :
                    usersWithAccess[user].read ? 'Read' : '',
            userRightsOrigin: usersWithAccess[user].userRightsOrigin
        });
    });

    Object.keys(organizationsWithAccess).forEach(organization => {
        organizationCollaborators.push({
            inOrg: organizationsWithAccess[organization].inOrg,
            isOrg: true,
            name: organization,
            orgsRightsOrigin: organizationsWithAccess[organization].orgsRightsOrigin,
            rights: organizationsWithAccess[organization].delete ? 'Read Write Delete' :
                    organizationsWithAccess[organization].write ? 'Read Write' :
                    organizationsWithAccess[organization].read ? 'Read' : ''
        });
    });

    return {
        userCollaborators,
        organizationCollaborators
    };
}

/**
 * Retrieve members and admins
 * @param {Array} orgs - list of organizations
 * @param {string} orgId - organization id
 * @return {{members: Array, admins: Array}} data containing members and admins
 */
export function retrieveMembersAndAdmins(orgs, orgId) {
    // Get the pertinent organization
    let org = orgs.filter(org => {
        return org._id === orgId;
    })[0];

    // Parse that org's data with error checking
    return {
        members: org ? org.users.map(user => {
            return {
                name: user,
                admin: org.admins.indexOf(user) !== -1
            };
        }) : [],
        admins: org ? org.admins.map(admin => {
            return {
                name: admin
            };
        }) : []
    };
}
