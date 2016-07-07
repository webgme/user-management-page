/**
 * Reducers for usersClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import { REQUEST_USERS, RECEIVE_USERS } from '../actions/users';

const initialState = {
    isFetching: false,
    users: []
};

const users = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_USERS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                isFetching: false,
                users: action.users
            });
        default:
            return state;
    }
};

export default users;
