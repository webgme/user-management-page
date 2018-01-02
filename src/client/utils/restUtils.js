/**
 * Utility functions for rest client
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import { isEmpty } from './utils';

/**
 * Gets the organizations the specified user is an admin of
 * @param {Array} orgs - organizations
 * @param {string} userId - userId
 * @return {Array.<T>} returns the organizations user specified is admin of
 */
export const getOrgsUserIsAdminOf = (orgs, userId) => {
    return orgs
        .filter(org => {
            return org.admins.indexOf(userId) > -1;
        })
        .map(org => {
            return org._id;
        });
};

/**
 * Gets the organizations the specified user can transfer to
 * @param {Array} organizations - organizations
 * @param {string} userId - userId
 * @param {string} currentProjectOwnerId - currentProjectOwnerId
 * @return {Array.<T>} array of organizations the user specified can transfer to
 */
export const getOrgsCanTransferToTo = (organizations, userId, currentProjectOwnerId) => {
    // Exclude current project's owner
    return getOrgsUserIsAdminOf(organizations, userId)
        .filter((orgId) => {
            return orgId !== currentProjectOwnerId;
        });
};

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
            return org._id === ownerId && org.admins.indexOf(user._id) !== -1;
        });
}

export const canUserTransfer = (organizations, users, ownerId, projectId, user) => {
    const collaborators = retrieveCollaborators(organizations, users, projectId);
    const userCollaborator = collaborators.userCollaborators.find((userCollaborator) => {
        return userCollaborator.name === user._id;
    }) || {};
    const rights = userCollaborator.rights || '';

    const orgsCanTransferTo = getOrgsCanTransferToTo(organizations, user._id, ownerId);

    return user.siteAdmin || (orgsCanTransferTo.length && rights.toLowerCase().indexOf('delete') > -1);
};

export const canUserDelete = (organizations, users, projectId, user) => {
    const collaborators = retrieveCollaborators(organizations, users, projectId);
    const userCollaborator = collaborators.userCollaborators.find((userCollaborator) => {
        return userCollaborator.name === user._id;
    }) || {};

    const rights = userCollaborator.rights || '';

    return user.siteAdmin || rights.toLowerCase().indexOf('delete') > -1;
};

/**
 * Maps usernames of users with access to a specified project to their respective rights
 * @param {Array} users - all users
 * @param {string} projectId - Id of project
 * @return {Map} map of users to their rights to a specified projects
 */
export function getUsersWithAccess(users, projectId) {
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
export function getOrganizationsWithAccess(orgs, projectId) {
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
export function getUsersInOrganizationsWithAccess(orgs, projectId) {
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

    let usersWithAccess = getUsersWithAccess(users, projectId),
        usersInOrganizationsWithAccess = getUsersInOrganizationsWithAccess(organizations, projectId),
        organizationsWithAccess = getOrganizationsWithAccess(organizations, projectId);

    // Union of rights if in organization
    if (isEmpty(usersInOrganizationsWithAccess)) {
        // Do nothing because then usersWithAccess is just self and does not need to be modified
    } else {
        Object.keys(usersInOrganizationsWithAccess).forEach(user => {
            if (usersWithAccess[user]) {
                usersWithAccess[user].read = usersWithAccess[user].read || usersInOrganizationsWithAccess[user].read; // eslint-disable-line max-len
                usersWithAccess[user].write = usersWithAccess[user].write || usersInOrganizationsWithAccess[user].write; // eslint-disable-line max-len
                usersWithAccess[user].delete = usersWithAccess[user].delete || usersInOrganizationsWithAccess[user].delete; // eslint-disable-line max-len
                usersWithAccess[user].inOrg = usersWithAccess[user].inOrg || usersInOrganizationsWithAccess[user].inOrg; // eslint-disable-line max-len
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
            rights: usersWithAccess[user].delete ? 'Read Write Delete' : // eslint-disable-line no-nested-ternary
                    usersWithAccess[user].write ? 'Read Write' : // eslint-disable-line no-nested-ternary
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
            rights: organizationsWithAccess[organization].delete ? 'Read Write Delete' : // eslint-disable-line no-nested-ternary, max-len
                    organizationsWithAccess[organization].write ? 'Read Write' : // eslint-disable-line no-nested-ternary, max-len
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
 * @return {Array} data containing members and admins
 */
export function retrieveMembersAndAdmins(orgs, orgId) {
    // Get the pertinent organization
    let org = null;
    let members = {};
    let result = [];

    for (let i = 0; i < orgs.length; i += 1) {
        if (orgs[i]._id === orgId) {
            org = orgs[i];
            break;
        }
    }

    if (org) {
        // Add all members.
        result = org.users.map(user => {
            members[user] = true;
            return {
                name: user,
                isMember: true,
                isAdmin: org.admins.indexOf(user) !== -1
            };
        });

        // See if there are any admins that aren't members - if so add them.
        org.admins.forEach(admin => {
            if (members[admin] !== true) {
                result.push({
                    name: admin,
                    isMember: false,
                    isAdmin: true
                });
            }
        });
    }

    return result;
}
