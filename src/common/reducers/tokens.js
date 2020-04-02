/**
 * Reducers for userClient
 * @author Umesh Timalsina / https://github.com/umesh-timalsina
 */

import { REQUEST_TOKENS, RECEIVE_TOKENS } from '../actions/tokens';

const initialState = {
    hasFetched: false,
    isFetching: false,
    tokens: [],
};

const tokens = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_TOKENS:
            return Object.assign({}, state, {
                hasFetched: true,
                isFetching: false,
                tokens: action.tokens,
            });
        case REQUEST_TOKENS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        default:
            return state;
    }
};

export default tokens;
