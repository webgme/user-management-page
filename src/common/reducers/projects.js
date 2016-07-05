/**
 * Reducers for projectsClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import {REQUEST_PROJECTS, RECEIVE_PROJECTS} from '../actions/projects';

const user = (state = {
    isFetching: false,
    projects: []
}, action) => {
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
        default:
            return state;
    }
};

export default user;
