/**
 * Top level of reducer composition
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { combineReducers } from 'redux';
// Self-defined
import basePath from './basePath';
import organizations from './organizations';
import projects from './projects';
import tables from './tables';
import user from './user';
import users from './users';
import general from './general';
import { USER_LOGOUT } from '../actions/general';

const reducers = combineReducers({
    basePath,
    organizations,
    projects,
    tables,
    user,
    users,
    general
});

const rootReducer = (state, action) => {
    let newState = state;
    if (action.type === USER_LOGOUT) {
        newState = { basePath: state.basePath };
    }

    return reducers(newState, action);
};

export default rootReducer;
