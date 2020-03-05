/**
 * Tokens client - all rest calls for personal access tokens
 * @author Umesh Timalsina / https://github.com/umesh-timalsina
 */

/* eslint-env node, browser */
import BaseClient from './baseClient';

export default class TokensClient extends BaseClient {
    constructor(baseUrl) {
        if (typeof baseUrl !== 'string') {
            baseUrl = '/rest/tokens/';
        }
        super(baseUrl);
    }

    getTokensForCurrentUser() {
        return super.get(['']);
    }

    createTokenForCurrentUser(name) {
        if (!name) {
            return super.post(['create']);
        }
        return super.post(['create', name]);
    }

    deleteTokenForCurrentUser(tokenID) {
        return super.delete([`${tokenID}`]);
    }
}