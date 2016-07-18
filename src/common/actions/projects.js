/**
 * Projects actions
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Self-defined
import ProjectsClient from '../../client/rest_client/projectsClient';

const projectsClient = new ProjectsClient();

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const REQUEST_PROJECTS_FAILURE = 'REQUEST_PROJECTS_FAILURE';
export const REQUEST_PROJECTS_SUCCESS = 'REQUEST_PROJECTS_SUCCESS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';

export const requestProjects = () => {
    return {
        type: REQUEST_PROJECTS
    };
};

export const receiveProjects = (projects) => {
    return {
        type: RECEIVE_PROJECTS,
        projects
    };
};

const shouldFetchProjects = (state) => {
    const { hasFetched, isFetching } = state.projects;

    let shouldFetch = true;
    if (hasFetched || isFetching) {
        shouldFetch = false;
    } else {
        shouldFetch = true;
    }

    return shouldFetch;
};

export const fetchProjects = () => {
    return dispatch => {
        dispatch(requestProjects());
        return projectsClient.getAllProjects()
            .then(projects => {
                dispatch(receiveProjects(projects));
            });
    };
};

export const fetchProjectsIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldFetchProjects(getState())) {
            return dispatch(fetchProjects());
        }
    };
};
