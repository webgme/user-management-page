/**
 * Top level of reducer composition
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { combineReducers } from 'redux';
// Self-defined
import themeColor from './themeColor';
import user from './user';

const reducers = combineReducers({
    themeColor,
    user
});

export default reducers;
