/**
 * Reducers for table actions
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import { SORT_CATEGORY } from '../actions/tables';

const initialTableState = {
        sortCategory: 'name',
        sortedForward: true
    },
    initialUsersTableState = {
        sortCategory: '_id',
        sortedForward: true
    };

const table = (state = initialTableState, action) => {
    switch (action.type) {
        case SORT_CATEGORY:
            let newState = Object.assign({}, state);
            if (state.sortCategory === action.sortCategory) {
                Object.assign(newState, {
                    sortedForward: !state.sortedForward
                });
            } else {
                Object.assign(newState, {
                    sortCategory: action.sortCategory,
                    sortedForward: true
                });
            }
            return newState;
        default:
            return state;
    }
};

const initialTablesState = {
    // Table from organization page
    organizations: initialTableState,
    organizationMembers: initialTableState,
    // Tables from the collaborator table (project page)
    projectUser: initialTableState,
    projectOrg: initialTableState,
    // Table from the projects page
    projects: initialTableState,
    // Table from users page
    users: initialUsersTableState
};

const tables = (state = initialTablesState, action) => {
    switch (action.type) {
        case SORT_CATEGORY:
            return Object.assign({}, state, {
                [action.table]: table(state[action.table], action)
            });
        default:
            return state;
    }
};

export default tables;
