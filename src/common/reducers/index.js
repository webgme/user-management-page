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

const reducers = combineReducers({
    basePath,
    organizations,
    projects,
    tables,
    user,
    users
});

export default reducers;
