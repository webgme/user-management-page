/**
 * Utility functions
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

import React from 'react';

/**
 * Capitalizes the first letter of a word (formatting help)
 * @param {string} word - word to be altered
 * @return {string} - formatted word
 */
export function capitalizeFirstLetter(word) {
    if (word.length === 0) {
        return '';
    }
    if (word.length === 1) {
        return word.substring(0, 1).toUpperCase();
    }
    return word.substring(0, 1).toUpperCase() + word.substring(1);
}

/**
 * Convert hex and opacity into a RGBA value
 * @param {string} hex - hex value
 * @param {Number} opacity - percent opacity (scale of 1 to 100)
 * @return {string} - returns the rgba ex. rgba(r,g,b,0.a)
 */
export function convertHexToRGBA(hex, opacity) {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${opacity / 100})`;
}

/**
 * Returns an array of the past 7 days of the week
 * @return {Array} - Array of the names of the past 7 days of the week
 */
export function getPastWeeksDays() {
    const DAYS = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];
    let result = [];
    for (let i = 0; i < 7; i++) {
        result.push(DAYS[(i + (new Date().getDay())) % 7]);
    }
    return result;
}

/**
 * Gets the hex of a random color
 * @return {string} - hex value for a random color in the format #XXXXXX
 */
export function getRandomColorHex() {
    let possibleInHex = '21A2B3C'.split(''),
        result = '#';

    for (let i = 0; i < 6; i++) {
        result += possibleInHex[Math.floor(Math.random() * possibleInHex.length)];
    }
    return result;
}

/**
 * Check if an object is empty
 * @param {Object} object - object to be checked
 * @return {boolean} - returns whether or not the object is 'empty'
 */
export function isEmpty(object) {

    if (object === null) {
        return true;
    }

    for (let key in object) {
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
 * Lightens or darkens a color by a specified percentage
 * @param {string} color - hex value of color to be changed - ex. #XXXXXX
 * @param {number} percent - from -100 to 100
 * @return {string} - new hex value
 */
export function shadeColor(color, percent) {

    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100, 10);
    G = parseInt(G * (100 + percent) / 100, 10);
    B = parseInt(B * (100 + percent) / 100, 10);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    let RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16));
    let GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16));
    let BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16));

    return '#' + RR + GG + BB;
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

/**
 * Custom sort method to sort objects by nested properties
 * @param {string} first - first field to search
 * @param {string} second - second field to search
 * @return {Function} - to be used as callback for javascript's native sort method
 */
export function sortObjectArrayByNestedDateField(first, second) {
    return function(a, b) {
        return new Date(b[first][second]) - new Date(a[first][second]);
    };
}

// Date functions
/**
 * Returns a string of how long ago
 * @param {string} isoDate - date in JS ISO format: Ex: 2016-06-13T14:21:56.877Z
 * @return {string} - how long ago
 */
export function timeAgo(isoDate) {

    let target = Date.parse(isoDate), // this is in milliseconds
        current = new Date().getTime(),
        difference = current - target,
        result = '';

    if (difference < 0) {
        result = 'just now';
    } else if (within(difference, 1000 * 60)) {
        result = timeOutput(difference, 1000, 'seconds');
    } else if (within(difference, 1000 * 60 * 60)) {
        result = timeOutput(difference, 1000 * 60, 'minutes');
    } else if (within(difference, 1000 * 60 * 60 * 24)) {
        result = timeOutput(difference, 1000 * 60 * 60, 'hours');
    } else if (within(difference, 1000 * 60 * 60 * 24 * 7)) {
        result = timeOutput(difference, 1000 * 60 * 60 * 24, 'days');
    } else if (within(difference, 1000 * 60 * 60 * 24 * 30)) {
        result = timeOutput(difference, 1000 * 60 * 60 * 24 * 7, 'weeks');
    } else if (within(difference, 1000 * 60 * 60 * 24 * 365)) {
        result = timeOutput(difference, 1000 * 60 * 60 * 24 * 30, 'months');
    } else {
        result = timeOutput(difference, 1000 * 60 * 60 * 24 * 365, 'years');
    }

    return result;
}

/**
 * Simple helper to see if the difference is within a certain range
 * @param {Number} difference - difference in milliseconds
 * @param {Number} range - range in milliseconds
 * @return {boolean} returns true or false if the value is within the range
 */
function within(difference, range) {
    return difference < range;
}

/**
 * Returns string value of the output
 * @param {Number} difference - difference from current in milliseconds
 * @param {Number} timeValue - unit being calculated ex. seconds: 1000
 * @param {string} pluralTimeName - plural name of time value ex. 'seconds'
 * @return {string} string of how long ago ex. '1 second ago' or '5 minutes ago'
 */
function timeOutput(difference, timeValue, pluralTimeName) {
    let result = '';
    if (Math.round(difference / timeValue) === 1) {
        result = `1 ${pluralTimeName.substring(0, pluralTimeName.length - 1)} ago`;
    } else {
        result = `${Math.round(difference / timeValue)} ${pluralTimeName} ago`;
    }
    return result;
}

/**
 * Collaborator table's rightsOrigin helper
 * @param {Array} arr - arr to be sifted through (user / orgs) rights
 * @return {Array} - formatted JSX of rights
 */
export function formatRightsOrigin(arr) {
    let result = [];

    arr.forEach((right, index) => {
        result.push(
            <div key={index + 1}>
                {right}
            </div>
        );
    });

    return result;
}
