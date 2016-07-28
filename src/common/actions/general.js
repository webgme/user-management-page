/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Self-defined
import LoginClient from '../../client/rest_client/loginClient';

const loginClient = new LoginClient();

export const USER_LOGOUT = 'USER_LOGOUT';

export const RECEIVE_CONFIG = 'RECEIVE_CONFIG';
export const REQUEST_CONFIG = 'REQUEST_CONFIG';

export const requestConfig = () => {
    return {
        type: REQUEST_CONFIG
    };
};

export const receiveConfig = (config) => {
    return {
        type: RECEIVE_CONFIG,
        config
    };
};

const shouldFetchConfig = (state) => {
    const { hasFetched, isFetching } = state.general.config;

    let shouldFetch = true;
    if (hasFetched || isFetching) {
        shouldFetch = false;
    }

    return shouldFetch;
};

export const fetchConfig = () => {
    return (dispatch) => {
        dispatch(requestConfig());
        return loginClient.getGmeConfig()
            .then(config => {
                dispatch(receiveConfig(config));
            });
    };
};

export const fetchConfigIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldFetchConfig(getState())) {
            return dispatch(fetchConfig());
        }
    };
};

export const userLogout = () => {
    return (dispatch) => {
        dispatch({
            type: USER_LOGOUT
        });
    };
};

