/**
 * Reducers for organizationsClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import { REQUEST_ORGANIZATIONS, RECEIVE_ORGANIZATIONS } from '../actions/organizations';

const initialState = {
    hasFetched: false,
    isFetching: false,
    organizations: []
};

const organizations = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_ORGANIZATIONS:
            return Object.assign({}, state, {
                hasFetched: true,
                isFetching: false,
                organizations: action.organizations
            });
        case REQUEST_ORGANIZATIONS:
            return Object.assign({}, state, {
                isFetching: true
            });
        default:
            return state;
    }
};

export default organizations;
