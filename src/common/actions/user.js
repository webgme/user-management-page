/**
 * User actions
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Self-defined
import UserClient from '../../client/rest_client/userClient';

const userClient = new UserClient();

export const REQUEST_USER = 'REQUEST_USER';
export const REQUEST_USER_FAILURE = 'REQUEST_USER_FAILURE';
export const REQUEST_USER_SUCCESS = 'REQUEST_USER_SUCCESS';
export const RECEIVE_USER = 'RECEIVE_USER';

export const SET_COLOR_THEME = 'SET_COLOR_THEME';

export const requestUser = () => {
    return {
        type: REQUEST_USER
    };
};

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    };
};

const shouldFetchUser = (state) => {
    const { hasFetched, isFetching } = state.user;

    let shouldFetch = true;
    if (hasFetched || isFetching) {
        shouldFetch = false;
    }

    return shouldFetch;
};

export const fetchUser = () => {
    return (dispatch) => {
        dispatch(requestUser());
        return userClient.getCurrentUser()
            .then(user => {
                dispatch(receiveUser(user));
            });
    };
};

export const fetchUserIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldFetchUser(getState())) {
            return dispatch(fetchUser());
        }
    };
};

export const setThemeColor = (themeColor) => {
    return (dispatch) => {
        return userClient.updateCurrentUserData({
            themeColor
        }).then(() => {
            dispatch(fetchUser());
        });
    };
};
