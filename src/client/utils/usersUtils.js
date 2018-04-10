/* globals document */
/**
 * Utility functions for users
 * @author kecso / https://github.com/kecso
 */

import BaseClient from '../rest_client/baseClient';

let displayNames = {};

export function getUserDisplayName(userId) {
    return displayNames[userId] || userId;
}

export function ensureUsersDisplayNames() {
    return new Promise((resolve, reject) => {
        let myClient = new BaseClient('');
        myClient.get(['/api/users'], {displayName: true})
            .then(function (users) {
                displayNames = {};
                users.forEach(function (user) {
                    displayNames[user._id] = user.displayName;
                });
                resolve();
            })
            .catch(reject);
    });
}
