/**
 * Organizations actions
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Self-defined
import OrganizationsClient from '../../client/rest_client/organizationsClient';

const organizationsClient = new OrganizationsClient();

export const REQUEST_ORGANIZATIONS = 'REQUEST_ORGANIZATIONS';
export const REQUEST_ORGANIZATIONS_FAILURE = 'REQUEST_ORGANIZATIONS_FAILURE';
export const REQUEST_ORGANIZATIONS_SUCCESS = 'REQUEST_ORGANIZATIONS_SUCCESS';
export const RECEIVE_ORGANIZATIONS = 'RECEIVE_ORGANIZATIONS';

export const REVERSE_SORT = 'REVERSE_SORT';
export const SORT_CATEGORY = 'SORT_CATEGORY';
export const SORT_FORWARD = 'SORT_FORWARD';

export const requestOrganizations = () => {
    return {
        type: REQUEST_ORGANIZATIONS
    };
};

export const receiveOrganizations = (organizations) => {
    return {
        type: RECEIVE_ORGANIZATIONS,
        organizations: organizations
    };
};

const shouldFetchOrganizations = (state) => {
    const { organizations, isFetching, trulyEmpty } = state.organizations;

    let shouldFetch = true;
    if (isFetching || trulyEmpty || organizations.length > 0) {
        shouldFetch = false;
    } else {
        shouldFetch = true;
    }

    return shouldFetch;
};

const fetchOrganizations = () => {
    return dispatch => {
        dispatch(requestOrganizations());
        return organizationsClient.getAllOrganizations()
            .then(organizations => {
                dispatch(receiveOrganizations(organizations));
            });
    };
};

export const fetchOrganizationsIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldFetchOrganizations(getState())) {
            return dispatch(fetchOrganizations());
        }
    };
};

export const reverseSort = () => {
    return {
        type: REVERSE_SORT
    };
};

export const sortBy = (sortCategory) => {
    return {
        type: SORT_CATEGORY,
        sortCategory
    };
};

export const sortForward = () => {
    return {
        type: SORT_FORWARD
    };
};
