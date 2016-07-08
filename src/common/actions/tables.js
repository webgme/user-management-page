/**
 * Tables actions
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

export const REVERSE_SORT = 'REVERSE_SORT';
export const SORT_CATEGORY = 'SORT_CATEGORY';
export const SORT_FORWARD = 'SORT_FORWARD';

export const reverseSort = () => {
    return {
        type: REVERSE_SORT
    };
};

export const sortBy = (sortCategory) => {
    return {
        type: SORT_CATEGORY,
        sortCategory
    };
};

export const sortForward = () => {
    return {
        type: SORT_FORWARD
    };
};
