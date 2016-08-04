/**
 * Reducers for table actions
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import { REFRESH_TABLES, SORT_CATEGORY,
         SET_PAGE_NUMBER, SET_SEARCH_TEXT, SET_SELECT_VALUE } from '../actions/tables';

const initialTableState = {
        pageNumber: 1,
        searchText: '',
        selectValue: 10,
        sortCategory: 'name',
        sortedForward: true
    },
    initialUsersTableState = Object.assign(initialTableState, {
        sortCategory: '_id'
    });

const replaceStateParam = (field, state, action) => {
    return Object.assign({}, state, {
        [field]: action[field]
    });
};

const table = (state = initialTableState, action) => {
    let newState;
    switch (action.type) {
        case SET_PAGE_NUMBER:
            return replaceStateParam('pageNumber', state, action);
        case SET_SEARCH_TEXT:
            if (action.searchText) {
                // When search is entered go to page one.
                newState = Object.assign({}, state, {
                    searchText: action.searchText,
                    pageNumber: 1
                });
            } else {
                newState = replaceStateParam('searchText', state, action);
            }

            return newState;
        case SET_SELECT_VALUE:
            return replaceStateParam('selectValue', state, action);
        case SORT_CATEGORY:
            newState = Object.assign({}, state);
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
        case REFRESH_TABLES:
            return initialTablesState;
        case SET_PAGE_NUMBER:
        case SET_SEARCH_TEXT:
        case SET_SELECT_VALUE:
        case SORT_CATEGORY:
            return Object.assign({}, state, {
                [action.table]: table(state[action.table], action)
            });
        default:
            return state;
    }
};

export default tables;
