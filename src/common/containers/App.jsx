/**
 * App container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import App from '../components/App';
import { setThemeColor } from '../actions';
import { THEME_COLORS } from '../../client/utils/constants';

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeThemeColor: (event) => {
            let themeColor;
            if (event.target.outerHTML.length > 20) {
                let rgbString = event.target.outerHTML.match(/background-color: (.*?);/)[1];
                themeColor = Object.keys(THEME_COLORS).filter(color => {
                    return THEME_COLORS[color] === rgbString;
                })[0];
            } else {
                themeColor = event.target.innerHTML.toLowerCase();
            }

            dispatch(setThemeColor(themeColor));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
