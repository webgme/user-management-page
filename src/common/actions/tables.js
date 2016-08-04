/**
 * Tables actions
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

export const REFRESH_TABLES = 'REFRESH_TABLES';
export const SORT_CATEGORY = 'SORT_CATEGORY';
export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const SET_SELECT_VALUE = 'SET_SELECT_VALUE';

export const refreshTables = () => {
    return {
        type: REFRESH_TABLES
    };
};

export const sortBy = (table, sortCategory) => {
    return {
        type: SORT_CATEGORY,
        table,
        sortCategory
    };
};

export const setPageNumber = (table, pageNumber = 1) => {
    return {
        type: SET_PAGE_NUMBER,
        table,
        pageNumber
    };
};

export const setSearchText = (table, searchText) => {
    return {
        type: SET_SEARCH_TEXT,
        table,
        searchText
    };
};

export const setSelectValue = (table, selectValue) => {
    return {
        type: SET_SELECT_VALUE,
        table,
        selectValue
    };
};
