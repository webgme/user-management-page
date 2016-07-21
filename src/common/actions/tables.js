/**
 * Tables actions
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

export const REFRESH_TABLES = 'REFRESH_TABLES';
export const SORT_CATEGORY = 'SORT_CATEGORY';

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
