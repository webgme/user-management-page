/**
 * Tables actions
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

export const SORT_CATEGORY = 'SORT_CATEGORY';

export const sortBy = (table, sortCategory) => {
    return {
        type: SORT_CATEGORY,
        table,
        sortCategory
    };
};
