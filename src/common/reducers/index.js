/**
 * Top level of reducer composition
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { combineReducers } from 'redux';
// Self-defined
import themeColor from './themeColor';

const reducers = combineReducers({
    themeColor
});

export default reducers;
