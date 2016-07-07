/**
 * Reducers for projectsClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import {REQUEST_PROJECTS, RECEIVE_PROJECTS,
        REVERSE_SORT, SORT_CATEGORY, SORT_FORWARD } from '../actions/projects';

const initialState = {
    isFetching: false,
    projects: [],
    sortCategory: 'name',
    sortedForward: true
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PROJECTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_PROJECTS:
            return Object.assign({}, state, {
                isFetching: false,
                projects: action.projects
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
