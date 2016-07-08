/**
 * Reducers for organizationsClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import {REQUEST_ORGANIZATIONS, RECEIVE_ORGANIZATIONS } from '../actions/organizations';

const initialState = {
    hasFetched: false,
    isFetching: false,
    organizations: [],
    trulyEmpty: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_ORGANIZATIONS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_ORGANIZATIONS:
            return Object.assign({}, state, {
                isFetching: false,
                hasFetched: true,
                organizations: action.organizations,
                trulyEmpty: action.organizations.length === 0
            });
        default:
            return state;
    }
};

export default user;
