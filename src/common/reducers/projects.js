/**
 * Reducers for projectsClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import { RECEIVE_COMMITS, REQUEST_COMMITS,
         RECEIVE_PROJECTS, REQUEST_PROJECTS } from '../actions/projects';

const initialState = {
    /* Structure of initailState.commits:
    commits: {
        exProjectId: {
            hasFetched: bool,
            isFetching: bool,
            commits: []
        }
    }
    */
    commits: {},
    hasFetched: false,
    isFetching: false,
    projects: []
};

const projects = (state = initialState, action) => {
    let receiveCommitsCopy,
        requestCommitsCopy;

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
        case RECEIVE_COMMITS:
            // TODO: consider immutability helpers
            receiveCommitsCopy = JSON.parse(JSON.stringify(state.commits));
            receiveCommitsCopy[`${action.ownerId}+${action.projectName}`] = {
                commits: action.commits,
                hasFetched: true,
                isFetching: false
            };
            return Object.assign({}, state, {
                commits: receiveCommitsCopy
            });
        case REQUEST_COMMITS:
            // TODO: consider immutability helpers
            requestCommitsCopy = JSON.parse(JSON.stringify(state.commits));
            requestCommitsCopy[`${action.ownerId}+${action.projectName}`] = {
                isFetching: true
            };
            return Object.assign({}, state, {
                commits: requestCommitsCopy
            });
        default:
            return state;
    }
};

export default projects;
