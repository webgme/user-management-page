/**
 * Reducers for projectsClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import { REQUEST_PROJECTS, RECEIVE_PROJECTS } from '../actions/projects';

const initialState = {
    hasFetched: false,
    isFetching: false,
    projects: []
};

const projects = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PROJECTS:
            return Object.assign({}, state, {
                hasFetched: true,
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

export default projects;
