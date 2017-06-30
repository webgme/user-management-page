/**
 * App container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
// Self-defined
import App from '../components/App';

const mapStateToProps = (state) => {
    // Default blue
    let themeColor = 'blue'

    if (state.user.user.settings && state.user.user.settings.hasOwnProperty('WebGMEProfilePage')) {
        themeColor = state.user.user.settings.WebGMEProfilePage.themeColor || 'blue';
    }

    return {
        themeColor
    };
};

export default connect(mapStateToProps)(App);
