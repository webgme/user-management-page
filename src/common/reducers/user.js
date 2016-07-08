/**
 * Reducers for userClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import {REQUEST_USER, RECEIVE_USER} from '../actions/user';

const initialState = {
    isFetching: false,
    user: {}
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_USER:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_USER:
            return Object.assign({}, state, {
                isFetching: false,
                user: action.user
            });
        default:
            return state;
    }
};

export default user;