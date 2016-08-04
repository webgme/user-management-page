/**
 * Color menu functionality
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import ColorMenu from '../../../components/header/navigation_bar/ColorMenu';
import { setThemeColor } from '../../../actions/user';

const mapDispatchToProps = (dispatch) => {
    return {
        changeThemeColor: (event) => {
            const themeColor = event.target.getAttribute('data-color');
            dispatch(setThemeColor(themeColor));
        }
    };
};

export default connect(null, mapDispatchToProps)(ColorMenu);
