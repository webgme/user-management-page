/**
 * Reducers for themeColor
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

const themeColor = (state = 'blue', action) => {
    switch (action.type) {
        case 'SET_THEME_COLOR':
            return action.color;
        default:
            return state;
    }
};

export default themeColor;
