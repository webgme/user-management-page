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

export const REQUEST_COMMITS = 'REQUEST_COMMITS';
export const REQUEST_COMMITS_FAILURE = 'REQUEST_COMMITS_FAILURE';
export const REQUEST_COMMITS_SUCCESS = 'REQUEST_COMMITS_SUCCESS';
export const RECEIVE_COMMITS = 'RECEIVE_COMMITS';

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
    }

    return shouldFetch;
};

export const fetchProjects = () => {
    return (dispatch) => {
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

export const requestCommits = (ownerId, projectName, numCommits) => {
    return {
        type: REQUEST_COMMITS,
        numCommits,
        ownerId,
        projectName
    };
};

export const receiveCommits = (ownerId, projectName, commits) => {
    return {
        type: RECEIVE_COMMITS,
        commits,
        ownerId,
        projectName
    };
};

const shouldFetchCommits = (ownerId, projectName, numCommits, state) => {
    const { commits, hasFetched, isFetching } = state.projects.commits[`${ownerId}+${projectName}`] ?
        state.projects.commits[`${ownerId}+${projectName}`] : {
            commits: [],
            hasFetched: false,
            isFetching: false
        };

    let shouldFetch = true;
    if (hasFetched || isFetching || commits.length >= numCommits) {
        shouldFetch = false;
    }

    return shouldFetch;
};

export const fetchCommits = (ownerId, projectName, numCommits = 100) => {
    return (dispatch) => {
        dispatch(requestCommits(ownerId, projectName, numCommits));
        return projectsClient.getLatestCommits(ownerId, projectName, numCommits)
            .then(commits => {
                dispatch(receiveCommits(ownerId, projectName, commits));
            });
    };
};

export const fetchCommitsIfNeeded = (ownerId, projectName, numCommits) => {
    return (dispatch, getState) => {
        if (shouldFetchCommits(ownerId, projectName, numCommits, getState())) {
            return dispatch(fetchCommits(ownerId, projectName, numCommits));
        }
    };
};
