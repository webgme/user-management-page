/**
 * Reducers for table actions
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import { REVERSE_SORT, SORT_CATEGORY, SORT_FORWARD } from '../actions/tables';

const initialState = {
    sortCategory: 'name',
    sortedForward: true
};

const tables = (state = initialState, action) => {
    switch (action.type) {
        case REVERSE_SORT:
            return Object.assign({}, state, {
                sortedForward: !state.sortedForward
            });
        case SORT_CATEGORY:
            return Object.assign({}, state, {
                sortCategory: action.sortCategory
            });
        case SORT_FORWARD:
            return Object.assign({}, state, {
                sortedForward: true
            });
        default:
            return state;
    }
};

export default tables;
