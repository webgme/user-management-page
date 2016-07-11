/**
 * Reducers for usersClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import { REQUEST_USERS, RECEIVE_USERS } from '../actions/users';

const initialState = {
    hasFetched: false,
    isFetching: false,
    users: []
};

const users = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                hasFetched: true,
                isFetching: false,
                users: action.users
            });
        case REQUEST_USERS:
            return Object.assign({}, state, {
                isFetching: true
            });
        default:
            return state;
    }
};

export default users;
