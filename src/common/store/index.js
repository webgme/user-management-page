/* global window */

/**
 * Redux store
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// Self-defined
import reducers from '../reducers';

const configureStore = (preloadedState) => {
    const store = createStore(
        reducers,
        preloadedState,
        // Compose configured for development (redux chrome extension)
        compose(
            applyMiddleware(thunkMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    return store;
};

export default configureStore;
