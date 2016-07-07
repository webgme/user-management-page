/**
 * Reducers for organizationsClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import {REQUEST_ORGANIZATIONS, RECEIVE_ORGANIZATIONS,
        REVERSE_SORT, SORT_CATEGORY, SORT_FORWARD } from '../actions/organizations';

const initialState = {
    isFetching: false,
    organizations: [],
    sortCategory: 'name',
    sortedForward: true
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
                organizations: action.organizations
            });
        case REVERSE_SORT:
            return Object.assign({}, state, {
                sortedForward: !state.sortedForward
            });
        case SORT_CATEGORY:
            return Object.assign({}, state, {
                sortCategory: action.sortCategory
            });
        case SORT_FORWARD:
            return Object.assign({}, state, {
                sortedForward: false
            });
        default:
            return state;
    }
};

export default user;
