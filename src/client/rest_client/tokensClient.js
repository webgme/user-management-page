/**
 * User client - all rest calls for api/user
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

    createTokenForCurrentUser(){
        return super.post(['create']);
    }

    deleteTokenForCurrentUser(tokenID) {
        return super.delete([`${tokenID}`]);
    }
}