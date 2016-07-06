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

export const REVERSE_SORT = 'REVERSE_SORT';
export const SORT_BY = 'SORT_BY';
export const SORT_FORWARD = 'SORT_FORWARD';

export const requestProjects = () => {
    return {
        type: REQUEST_PROJECTS
    };
};

export const receiveProjects = (projects) => {
    return {
        type: RECEIVE_PROJECTS,
        projects: projects
    };
};

const shouldFetchProjects = (state) => {
    const { isFetching, projects } = state.projects;

    let shouldFetch = true;
    if (isFetching || projects.length > 0) {
        shouldFetch = false;
    } else {
        shouldFetch = true;
    }

    return shouldFetch;
};

const fetchProjects = () => {
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

export const reverseSort = () => {
    return {
        type: REVERSE_SORT
    };
};

export const sortBy = (sortBy) => {
    return {
        type: SORT_BY,
        sortBy
    };
};

export const sortForward = () => {
    return {
        type: SORT_FORWARD
    };
};
