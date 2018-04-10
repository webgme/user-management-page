/* globals document */
/**
 * Utility functions for users
 * @author kecso / https://github.com/kecso
 */

import BaseClient from '../rest_client/BaseClient';

const displayNames = {};
let requested = false,
    myClient = null;

export function getUserDisplayName(userId) {
    if (myClient === null) {
        myClient = new BaseClient('');
    }

    if (requested === false) {
        requested = true;
        myClient.get(['/api/users'], {displayName: true})
            .then(function (users) {
                users.forEach(function (user) {
                    displayNames[user._id] = user.displayName;
                });
            })
            .catch(function (/*err*/) {
                requested = false;
            });
    }

    return displayNames[userId] || userId;
}
