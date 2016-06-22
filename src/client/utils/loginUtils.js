/**
 * Login/Register pages' utility functions
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

/**
 * Verifies whether an email is allowed (check in Register page)
 * @param {string} email - email to be checked
 * @return {boolean} - T/F valid email
 */
export function verifyEmail(email) {
    return email.length >= 3 &&
           /^\w+@\w+\.\w+$/.test(email);
}

/**
 * Verifies whether a password is allowed (check in Register page)
 * @param {string} password - password to be checked
 * @return {boolean} - T/F valid password
 */
export function verifyPassword(password) {
    let badPasswords = ['password', '123'];
    return password.length >= 3 &&
           badPasswords.indexOf(password) === -1;
}

/**
 * Verifies whether a userId is allowed (check in Register page)
 * @param {string} userId - userId to be checked
 * @return {boolean} - T/F valid userId
 */
export function verifyUserId(userId) {
    return userId.length >= 3 &&
           /[a-zA-Z0-9_]+/.test(userId);
}
