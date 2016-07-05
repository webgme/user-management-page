/**
 * Redux store
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { createStore } from 'redux';
// Self-defined
import reducers from '../reducers';

const store = createStore(
    reducers
);

export default store;
