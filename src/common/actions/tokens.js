/**
 * Tokens actions
 * @author Umesh Timalsina / https://github.com/umesh-timalsina
 */

// Self-defined
import TokensClient from '../../client/rest_client/tokensClient';
const tokensClient = new TokensClient();

export const REQUEST_TOKENS = 'REQUEST_TOKENS';
export const RECEIVE_TOKENS = 'RECEIVE_TOKENS';

export const requestTokens = () => {
    return {
        type: REQUEST_TOKENS,
    };
};

export const receiveTokens = (tokens) => {
    return {
        type: RECEIVE_TOKENS,
        tokens,
    };
};

export const shouldFetchTokens = (state) => {
    const {hasFetched, isFetching} = state.tokens;

    let shouldFetch = true;
    if (hasFetched || isFetching) {
        shouldFetch = false;
    }

    return shouldFetch;
};

export const fetchTokens = () => {
    return (dispatch) => {
        dispatch(requestTokens());
        return tokensClient.getTokensForCurrentUser()
            .then((tokens) => {
                dispatch(receiveTokens(tokens));
            });
    };
};

export const fetchTokensIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldFetchTokens(getState())) {
            return dispatch(fetchTokens());
        }
    };
};

