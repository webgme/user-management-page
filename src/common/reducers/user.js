/**
 * Reducers for userClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import { REQUEST_USER, RECEIVE_USER } from '../actions/user';

const initialState = {
    hasFetched: false,
    isFetching: false,
    user: {}
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            return Object.assign({}, state, {
                hasFetched: true,
                isFetching: false,
                user: action.user
            });
        case REQUEST_USER:
            return Object.assign({}, state, {
                isFetching: true
            });
        default:
            return state;
    }
};

export default user;
