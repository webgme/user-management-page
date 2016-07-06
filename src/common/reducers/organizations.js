/**
 * Reducers for organizationsClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import {REQUEST_ORGANIZATIONS, RECEIVE_ORGANIZATIONS} from '../actions/organizations';

const user = (state = {
    isFetching: false,
    organizations: []
}, action) => {
    switch (action.type) {
        case REQUEST_ORGANIZATIONS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_ORGANIZATIONS:
            return Object.assign({}, state, {
                isFetching: false,
                organizations: action.organizations
            });
        default:
            return state;
    }
};

export default user;
