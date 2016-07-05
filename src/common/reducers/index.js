/**
 * Top level of reducer composition
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { combineReducers } from 'redux';
// Self-defined
import organizations from './organizations';
import projects from './projects';
import themeColor from './themeColor';
import user from './user';

const reducers = combineReducers({
    organizations,
    projects,
    themeColor,
    user
});

export default reducers;
