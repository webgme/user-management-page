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
    const { organizations, isFetching } = state.organizations;

    let shouldFetch = true;
    if (organizations.length > 0 || isFetching) {
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