/**
 * App container
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// Self-defined
import App from '../components/App';

const mapStateToProps = (state) => {
    // Default blue
    let themeColor = 'blue';

    if (state.user.user.settings && state.user.user.settings.hasOwnProperty('WebGMEProfilePage')) {
        themeColor = state.user.user.settings.WebGMEProfilePage.themeColor || 'blue';
    }

    return {
        themeColor,
        siteAdmin: state.user.user.siteAdmin
    };
};

export default withRouter(connect(mapStateToProps)(App));
