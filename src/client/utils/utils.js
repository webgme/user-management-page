/**
 * Check if an object is empty
 * @param {Object} object - object to be checked
 * @return {boolean} - returns whether or not the object is "empty"
 */
export function isEmpty(object) {

    if (object === null) {
        return true;
    }

    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

/**
 * Formats an array of objects to be sent to the multiselect drop-down list
 * @param {Array} allOfOneThing - array of one kind of objects(users/organizations)
 * @return {Object|*|Array} - Formatted array for use with react-select
 */
export function multiselectFormat(allOfOneThing) {
    return allOfOneThing.map(oneThing => {
        return Object.assign({}, {
            label: oneThing._id,
            value: oneThing._id
        });
    });
}

/**
 * Custom sort method to sort objects by a chosen field
 * @param {string} field - field of object to be sorted by
 * @return {Function} - to be used as callback for javascript's native sort method
 */
export function sortObjectArrayByField(field) {
    return function(a, b) {
        return (a[field].toLowerCase() < b[field].toLowerCase()) ? -1 :
            (a[field].toLowerCase() > b[field].toLowerCase()) ? 1 : 0;
    };
}
