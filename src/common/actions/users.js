/**
 * Users actions
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Self-defined
import UsersClient from '../../client/rest_client/usersClient';

const usersClient = new UsersClient();

export const REQUEST_USERS = 'REQUEST_USERS';
export const REQUEST_USERS_FAILURE = 'REQUEST_USERS_FAILURE';
export const REQUEST_USERS_SUCCESS = 'REQUEST_USERS_SUCCESS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const requestUsers = () => {
    return {
        type: REQUEST_USERS
    };
};

export const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users: users
    };
};

const shouldFetchUsers = (state) => {
    const { users, isFetching } = state.users;

    let shouldFetch = true;
    if (isFetching || users.length > 0) {
        shouldFetch = false;
    } else {
        shouldFetch = true;
    }

    return shouldFetch;
};

const fetchUsers = () => {
    return dispatch => {
        dispatch(requestUsers());
        return usersClient.getAllUsers()
            .then(users => {
                dispatch(receiveUsers(users));
            });
    };
};

export const fetchUsersIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldFetchUsers(getState())) {
            return dispatch(fetchUsers());
        }
    };
};