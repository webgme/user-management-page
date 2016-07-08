/**
 * Reducers for projectsClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import { REQUEST_PROJECTS, RECEIVE_PROJECTS } from '../actions/projects';

const initialState = {
    isFetching: false,
    projects: []
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PROJECTS:
            return Object.assign({}, state, {
                isFetching: false,
                projects: action.projects
            });
        case REQUEST_PROJECTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        default:
            return state;
    }
};

export default user;
