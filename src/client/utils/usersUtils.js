/* globals document */
/**
 * Utility functions for users
 * @author kecso / https://github.com/kecso
 */
let displayNames = {};

export function getUserDisplayName(userId) {
    return displayNames[userId] || userId;
}

export function ensureUsersDisplayNames(restClient) {
    return new Promise((resolve, reject) => {
        restClient.get(['users'], {displayName: true})
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
