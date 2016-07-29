/**
 * Reducers for userClient
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import {REQUEST_CONFIG, RECEIVE_CONFIG} from '../actions/general';

const initialState = {
    config: {
        hasFetched: false,
        isFetching: false,
        config: {
            authentication: {}
        }
    }
};

const general = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case RECEIVE_CONFIG:
            return Object.assign({}, state, {
                config: {
                    hasFetched: true,
                    isFetching: false,
                    config: action.config
                }
            });
        case REQUEST_CONFIG:
            newState = Object.assign({}, state);
            newState.config.isFetching = true;
            return newState;
        default:
            return state;
    }
};

export default general;
