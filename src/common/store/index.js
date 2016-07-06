/**
 * Redux store
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// Self-defined
import reducers from '../reducers';

function configureStore(preloadedState) {
    const store = createStore(
        reducers,
        preloadedState,
        applyMiddleware(thunkMiddleware)
    );

    return store;
}

export default configureStore;
